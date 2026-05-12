const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const upload = multer({ dest: "uploads/" });

/* =========================
   ATS ENGINE
========================= */

const ACTION_VERBS = [
  "developed",
  "built",
  "created",
  "designed",
  "implemented",
  "optimized",
  "improved",
];

const ROLE_KEYWORDS = {
  frontend: ["react", "javascript", "html", "css"],
  backend: ["node", "express", "mongodb"],
};

function detectRole(text) {
  text = text.toLowerCase();

  if (text.includes("react"))
    return "Frontend Developer";

  if (text.includes("node"))
    return "Backend Developer";

  if (text.includes("python"))
    return "AI/ML Engineer";

  if (text.includes("java"))
    return "Java Developer";

  return "Software Developer";
}

function calculateATS(text, jobDesc = "") {
  let score = 0;

  let tips = [];

  let missing = [];

  text = text.toLowerCase();

  // =========================
  // SECTIONS
  // =========================
  const sections = [
    "experience",
    "skills",
    "projects",
    "education",
  ];

  score +=
    sections.filter((s) =>
      text.includes(s)
    ).length * 10;

  // =========================
  // LENGTH
  // =========================
  if (text.length > 1000) {
    score += 10;
  } else {
    tips.push("Add more content");
  }

  // =========================
  // ACTION VERBS
  // =========================
  const verbs = ACTION_VERBS.filter((v) =>
    text.includes(v)
  );

  score += verbs.length * 3;

  if (verbs.length < 2) {
    tips.push(
      "Use action verbs like developed, built, created"
    );
  }

  // =========================
  // ACHIEVEMENTS
  // =========================
  if (/\d+%|\d+\+/.test(text)) {
    score += 15;
  } else {
    tips.push(
      "Add measurable achievements"
    );
  }

  // =========================
  // ROLE SKILLS
  // =========================
  const role = detectRole(text);

  const skills =
    ROLE_KEYWORDS[
      role.includes("Frontend")
        ? "frontend"
        : "backend"
    ] || [];

  skills.forEach((s) => {
    if (text.includes(s)) {
      score += 5;
    } else {
      missing.push(s);
    }
  });

  // =========================
  // JOB DESCRIPTION MATCH
  // =========================
  let matchScore = 0;

  if (jobDesc) {
    const words = jobDesc
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 2);

    const matched = words.filter((w) =>
      text.includes(w)
    );

    matchScore = Math.floor(
      (matched.length / words.length) * 100
    );

    score += matchScore * 0.3;

    // Missing keywords from JD
    words.forEach((w) => {
      if (
        !text.includes(w) &&
        !missing.includes(w)
      ) {
        missing.push(w);
      }
    });
  }

  // =========================
  // FINAL SCORE
  // =========================
  score = Math.min(
    Math.round(score),
    100
  );

  return {
    score,
    role,
    tips,
    missing,
    matchScore,
  };
}

/* =========================
   ATS CHECK
========================= */

router.post(
  "/ats",
  upload.single("resume"),
  async (req, res) => {
    try {
      const buffer = fs.readFileSync(
        req.file.path
      );

      const data = await pdfParse(buffer);

      const result = calculateATS(
        data.text
      );

      res.json({
        score: result.score,
        tips: result.tips,
        keywords_missing: result.missing,
        role: result.role,
        resumeText: data.text,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        error: "ATS failed",
      });
    }
  }
);

/* =========================
   JOB ATS CHECK
========================= */

router.post(
  "/job-ats",
  upload.single("resume"),
  async (req, res) => {
    try {
      const buffer = fs.readFileSync(
        req.file.path
      );

      const data = await pdfParse(buffer);

      const resumeText = data.text || "";

      const jobDescription =
        req.body.jobDescription || "";

      const result = calculateATS(
        resumeText,
        jobDescription
      );

      res.json({
        score: result.score,
        role: result.role,
        tips: result.tips,
        keywords_missing: result.missing,
        matchScore: result.matchScore,
        resumeText,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        error: "Job ATS failed",
      });
    }
  }
);

/* =========================
   IMPROVE RESUME
========================= */

router.post("/improve", (req, res) => {
  const { role } = req.body;

  const improved = `
SUMMARY
Highly motivated ${role} with strong problem-solving skills and hands-on project experience.

SKILLS
React, JavaScript, Node.js, MongoDB, APIs, Git

PROJECTS
AI Job Tracker
- Developed full-stack application using React & Node.js
- Improved ATS matching system

Resume ATS Analyzer
- Built intelligent ATS checker using AI logic
- Increased resume optimization score above 90%

EXPERIENCE
- Built scalable web applications
- Optimized UI/UX performance

ACHIEVEMENTS
- Improved ATS score to 90+
- Developed multiple real-world projects
`;

  res.json({
    improvedResume: improved,
  });
});

/* =========================
   MATCH JOBS
========================= */

router.post(
  "/match-jobs",
  (req, res) => {
    const { resumeText, jobs } =
      req.body;

    const results = jobs.map((job) => {
      const desc = (
        job.job_description || ""
      ).toLowerCase();

      const words = desc
        .split(/\W+/)
        .filter((w) => w.length > 2);

      const matched = words.filter((w) =>
        resumeText
          .toLowerCase()
          .includes(w)
      );

      const score = Math.floor(
        (matched.length / words.length) *
          100
      );

      return {
        ...job,
        matchScore: score,
      };
    });

    results.sort(
      (a, b) =>
        b.matchScore - a.matchScore
    );

    res.json(results);
  }
);

module.exports = router;