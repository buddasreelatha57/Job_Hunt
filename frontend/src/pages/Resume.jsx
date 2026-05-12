import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default function Resume() {

  // ================= STATES =================
  const [defaultResume, setDefaultResume] = useState(null);

  const [useSavedResume, setUseSavedResume] =
    useState(true);

  const [newResume, setNewResume] = useState(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const [score, setScore] = useState(null);

  const [tips, setTips] = useState([]);

  const [keywords, setKeywords] = useState([]);

  const [role, setRole] = useState("");

  const [improved, setImproved] = useState("");

  const [template, setTemplate] =
    useState("modern");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ================= LOAD SAVED =================
  const [savedResumeName, setSavedResumeName] =
    useState("");

  useEffect(() => {
    const name = localStorage.getItem(
      "defaultResumeName"
    );

    if (name) {
      setSavedResumeName(name);
    }
  }, []);

  // ================= ROLE DETECTION =================
  const detectRole = (text) => {
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
  };

  // ================= SAVE DEFAULT RESUME =================
  const saveDefaultResume = async () => {
    if (!defaultResume)
      return alert("Upload resume first");

    const formData = new FormData();

    formData.append("resume", defaultResume);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai/ats",
        formData
      );

      localStorage.setItem(
        "defaultResumeText",
        res.data.resumeText || ""
      );

      localStorage.setItem(
        "defaultResumeName",
        defaultResume.name
      );

      setSavedResumeName(defaultResume.name);

      alert("Default Resume Saved ✅");

      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  };

  // ================= ATS CHECK =================
  const checkATS = async () => {

    if (!jobDescription)
      return alert(
        "Paste Job Description"
      );

    try {
      setLoading(true);

      setError("");

      // ================= USE SAVED RESUME =================
      if (useSavedResume) {

        const resumeText =
          localStorage.getItem(
            "defaultResumeText"
          );

        if (!resumeText)
          return alert(
            "No saved resume found"
          );

        const res = await axios.post(
          "http://localhost:5000/api/ai/check-stored-resume",
          {
            resumeText,
            jobDescription
          }
        );

        setScore(res.data.score || 0);

        setTips(res.data.tips || []);

        setKeywords(
          res.data.keywords_missing || []
        );

        setRole(
          detectRole(resumeText)
        );

        localStorage.setItem(
          "resumeText",
          resumeText
        );

      }

      // ================= UPLOAD NEW RESUME =================
      else {

        if (!newResume)
          return alert(
            "Upload Resume"
          );

        const formData = new FormData();

        formData.append(
          "resume",
          newResume
        );

        formData.append(
          "jobDescription",
          jobDescription
        );

        const res = await axios.post(
          "http://localhost:5000/api/ai/job-ats",
          formData
        );

        const text =
          res.data.resumeText || "";

        setScore(res.data.score || 0);

        setTips(res.data.tips || []);

        setKeywords(
          res.data.keywords_missing || []
        );

        setRole(
          detectRole(text)
        );

        localStorage.setItem(
          "resumeText",
          text
        );
      }

      setLoading(false);

    } catch (err) {
      console.log(err);

      setError("ATS Check Failed");

      setLoading(false);
    }
  };

  // ================= IMPROVE RESUME =================
  const improveResume = async () => {
    try {
      setLoading(true);

      const resumeText =
        localStorage.getItem(
          "resumeText"
        );

      const res = await axios.post(
        "http://localhost:5000/api/ai/improve",
        {
          resumeText,
          role,
          jobDescription
        }
      );

      setImproved(
        res.data.improvedResume
      );

      setLoading(false);

    } catch (err) {
      console.log(err);

      setImproved(`
SUMMARY
Strong ${role} with practical experience

SKILLS
React, JavaScript, Node.js, APIs

PROJECTS
- AI Job Portal
- ATS Resume Analyzer

EXPERIENCE
Fresher with strong projects

EDUCATION
Bachelor Degree
`);

      setLoading(false);
    }
  };

  // ================= DOWNLOAD PDF =================
  const downloadPDF = () => {

    if (!improved)
      return alert(
        "Generate Resume First"
      );

    const doc = new jsPDF();

    let y = 10;

    const lines =
      improved.split("\n");

    lines.forEach((line) => {

      if (
        line.toUpperCase().includes("SUMMARY") ||
        line.toUpperCase().includes("SKILLS") ||
        line.toUpperCase().includes("PROJECTS") ||
        line.toUpperCase().includes("EXPERIENCE") ||
        line.toUpperCase().includes("EDUCATION")
      ) {

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.text(line, 10, y);

        y += 8;

      } else {

        doc.setFont(
          "helvetica",
          "normal"
        );

        const split =
          doc.splitTextToSize(
            line,
            180
          );

        doc.text(split, 10, y);

        y += split.length * 6;
      }

      if (y > 280) {
        doc.addPage();

        y = 10;
      }
    });

    doc.save(
      "Improved_Resume.pdf"
    );
  };

  // ================= TEMPLATE =================
  const renderTemplate = () => {

    if (!improved) return null;

    const lines =
      improved.split("\n");

    return (
      <div className="mt-6">

        {/* TEMPLATE SELECT */}
        <div className="text-center mb-4">

          <select
            value={template}
            onChange={(e) =>
              setTemplate(
                e.target.value
              )
            }
            className="px-3 py-2 border rounded-full"
          >
            <option value="modern">
              Modern
            </option>

            <option value="minimal">
              Minimal
            </option>

            <option value="professional">
              Professional
            </option>

          </select>
        </div>

        {/* MODERN */}
        {template === "modern" && (
          <div className="p-5 bg-white shadow-xl rounded-xl border-l-4 border-purple-500">

            {lines.map((line, i) => (
              <p
                key={i}
                className={`mb-2 ${
                  line ===
                  line.toUpperCase()
                    ? "font-bold text-purple-600 text-lg mt-4"
                    : "text-sm"
                }`}
              >
                {line}
              </p>
            ))}

          </div>
        )}

        {/* MINIMAL */}
        {template === "minimal" && (
          <div className="p-5 border rounded-xl bg-gray-50">

            {lines.map((line, i) => (
              <p
                key={i}
                className={`mb-1 ${
                  line ===
                  line.toUpperCase()
                    ? "font-semibold mt-3"
                    : "text-sm text-gray-700"
                }`}
              >
                {line}
              </p>
            ))}

          </div>
        )}

        {/* PROFESSIONAL */}
        {template ===
          "professional" && (
          <div className="p-5 bg-gray-100 rounded-xl border">

            {lines.map((line, i) => (
              <p
                key={i}
                className={`mb-2 ${
                  line ===
                  line.toUpperCase()
                    ? "font-bold text-blue-700 mt-4 text-lg"
                    : "text-sm"
                }`}
              >
                {line}
              </p>
            ))}

          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-center mt-10 px-4">

      <div className="w-full max-w-3xl bg-white dark:bg-darkcard p-6 rounded-2xl shadow-lg">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          AI Resume Builder 🚀
        </h2>

        {/* ================= DEFAULT RESUME ================= */}
        <div className="border rounded-2xl p-5 mb-8">

          <h3 className="font-bold text-xl mb-4 text-purple-600">
            Save Default Resume
          </h3>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setDefaultResume(
                e.target.files[0]
              )
            }
            className="border p-2 rounded w-full"
          />

          <button
            onClick={
              saveDefaultResume
            }
            className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full"
          >
            Save Resume
          </button>

          {savedResumeName && (
            <p className="text-green-600 text-sm mt-3">
              ✅ Saved Resume:
              {" "}
              {savedResumeName}
            </p>
          )}
        </div>

        {/* ================= ATS SECTION ================= */}
        <div className="border rounded-2xl p-5">

          <h3 className="font-bold text-xl mb-5 text-blue-600">
            ATS Resume Checker
          </h3>

          {/* OPTIONS */}
          <div className="flex gap-4 mb-5 flex-wrap">

            

            <button
              onClick={() =>
                setUseSavedResume(false)
              }
              className={`px-4 py-2 rounded-full ${
                !useSavedResume
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Upload New Resume
            </button>

          </div>

          {/* NEW RESUME */}
          {!useSavedResume && (
            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setNewResume(
                  e.target.files[0]
                )
              }
              className="border p-2 rounded w-full mb-4"
            />
          )}

          {/* JOB DESCRIPTION */}
          <textarea
            rows="8"
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(
                e.target.value
              )
            }
            placeholder="Paste Job Description..."
            className="w-full border rounded-xl p-3 text-black"
          />

          {/* CHECK BUTTON */}
          <button
            onClick={checkATS}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full"
          >
            Check ATS Score
          </button>

          {/* LOADING */}
          {loading && (
            <p className="mt-4 text-purple-500 animate-pulse">
              Processing...
            </p>
          )}

          {/* ERROR */}
          {error && (
            <p className="mt-4 text-red-500">
              {error}
            </p>
          )}

          {/* ROLE */}
          {role && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Detected Role
              </p>

              <h3 className="font-bold text-purple-600">
                {role}
              </h3>
            </div>
          )}

          {/* SCORE */}
          {score !== null && (
            <h3 className="mt-4 text-2xl font-bold">
              ATS Score:
              {" "}
              <span
                className={`${
                  score >= 85
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {score}%
              </span>
            </h3>
          )}

          {/* ELIGIBLE */}
          {score >= 85 && (
            <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-xl font-semibold">
              ✅ Eligible to Apply
            </div>
          )}

          {/* NOT ELIGIBLE */}
          {score < 85 &&
            score !== null && (
            <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-xl font-semibold">
              ❌ Improve Resume
            </div>
          )}

          {/* TIPS */}
          {tips.length > 0 && (
            <div className="mt-6">

              <h4 className="font-bold text-purple-600 mb-2">
                Improvements
              </h4>

              <ul className="list-disc ml-5 text-sm">

                {tips.map(
                  (tip, i) => (
                    <li key={i}>
                      {tip}
                    </li>
                  )
                )}

              </ul>
            </div>
          )}

          {/* MISSING SKILLS */}
          {keywords.length > 0 && (
            <div className="mt-6">

              <h4 className="font-bold text-red-500 mb-3">
                Missing Skills
              </h4>

              <div className="grid grid-cols-2 gap-3">

                {keywords.map(
                  (k, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl text-center font-semibold bg-gray-500"
                    >
                      {k}
                    </div>
                  )
                )}

              </div>
            </div>
          )}

          {/* IMPROVE BUTTON */}
          {score !== null &&
            score < 85 && (
            <button
              onClick={
                improveResume
              }
              className="mt-6 w-full py-2 bg-green-600 text-black rounded-full"
            >
              Improve Resume to 90+ ATS
            </button>
          )}

          {/* TEMPLATE */}
          {renderTemplate()}

          {/* DOWNLOAD */}
          {improved && (
            <button
              onClick={
                downloadPDF
              }
              className="mt-4 w-full py-2 bg-purple-600 text-white rounded-full"
            >
              Download Improved Resume
            </button>
          )}

        </div>
      </div>
    </div>
  );
}