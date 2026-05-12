const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// =========================
// GET ALL JOBS
// =========================
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.log(err);
    res.status(500).json([]);
  }
});

// =========================
// CREATE JOB
// =========================
router.post("/", async (req, res) => {
  try {
    const job = await Job.create({
      job_title: req.body.job_title || "Job Opening",
      employer_name: req.body.employer_name || "Unknown Company",
      job_city: req.body.job_city || "Remote",
      job_type: req.body.job_type || "remote",
      job_description: req.body.job_description || "",
      job_apply_link: req.body.job_apply_link || "#",

      job_role: req.body.job_role || "",
      qualification: req.body.qualification || "Any Graduate",
      batch: req.body.batch || "2024 - 2026",
      experience: req.body.experience || "Fresher",

      isEdited: false,
      createdAt: new Date()
    });

    res.json(job);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Create failed" });
  }
});

// =========================
// CLEAR ALL JOBS (IMPORTANT FIX)
// =========================
router.get("/clear", async (req, res) => {
  try {
    await Job.deleteMany({});
    res.json({ message: "All jobs deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// =========================
// GET JOB BY ID (FIX 404 ERROR)
// =========================
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// =========================
// UPDATE JOB (ONLY ONCE EDIT)
// =========================
router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.isEdited) {
      return res.status(403).json({ message: "Already edited once" });
    }

    job.job_title = req.body.job_title ?? job.job_title;
    job.employer_name = req.body.employer_name ?? job.employer_name;
    job.job_role = req.body.job_role ?? job.job_role;
    job.qualification = req.body.qualification ?? job.qualification;
    job.batch = req.body.batch ?? job.batch;
    job.experience = req.body.experience ?? job.experience;
    job.job_description = req.body.job_description ?? job.job_description;

    job.isEdited = true;

    const updated = await job.save();
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;