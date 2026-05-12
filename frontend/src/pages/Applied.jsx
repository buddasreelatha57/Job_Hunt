import { useEffect, useState } from "react";
import axios from "axios";

import {
  CheckCircle2,
  Building2,
  MapPin,
  Briefcase,
  Trash2,
  ExternalLink
} from "lucide-react";

export default function AppliedJobs() {

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  // ================= FETCH APPLIED =================
  const fetchAppliedJobs = async () => {

    try {

      setLoading(true);

      // GET ALL JOBS
      const res = await axios.get(
        "http://127.0.0.1:5000/api/jobs"
      );

      // GET APPLIED IDS
      const appliedIds =
        JSON.parse(
          localStorage.getItem("appliedJobs")
        ) || [];

      // FILTER APPLIED JOBS
      const appliedJobs =
        (res.data || []).filter((job) =>
          appliedIds.includes(job._id)
        );

      setJobs(appliedJobs);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchAppliedJobs();

  }, []);

  // ================= REMOVE APPLIED =================
  const removeApplied = (jobId) => {

    // REMOVE FROM UI
    const updatedJobs =
      jobs.filter((j) => j._id !== jobId);

    setJobs(updatedJobs);

    // UPDATE LOCALSTORAGE
    const appliedIds =
      JSON.parse(
        localStorage.getItem("appliedJobs")
      ) || [];

    const updatedIds =
      appliedIds.filter((id) => id !== jobId);

    localStorage.setItem(
      "appliedJobs",
      JSON.stringify(updatedIds)
    );
  };

  // ================= LOADING =================
  if (loading) {

    return (

      <div className="text-center py-20 text-xl">

        Loading Applied Jobs...

      </div>
    );
  }

  return (

    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* ================= TITLE ================= */}
      <div className="flex items-center justify-between mb-8">

        <h1
          className="
            text-3xl
            font-bold

            text-pink-600
            dark:text-teal-400
          "
        >
          Applied Jobs
        </h1>

        <div
          className="
            px-4 py-2
            rounded-full

            bg-green-500
            text-white

            font-semibold
          "
        >
          {jobs.length} Applied
        </div>

      </div>

      {/* ================= EMPTY ================= */}
      {jobs.length === 0 && (

        <div
          className="
            p-10
            rounded-3xl

            bg-white
            dark:bg-[#0f172a]

            text-center

            shadow-lg
          "
        >

          <CheckCircle2
            size={60}
            className="
              mx-auto mb-4

              text-pink-500
              dark:text-teal-400
            "
          />

          <h2 className="text-2xl font-bold">
            No Applied Jobs
          </h2>

          <p className="text-gray-500 mt-2">
            Apply jobs from Jobs page
          </p>

        </div>

      )}

      {/* ================= JOBS ================= */}
      <div className="space-y-5">

        {jobs.map((job) => (

          <div
            key={job._id}
            className="
              p-6
              rounded-3xl

              bg-white
              dark:bg-[#0f172a]

              border border-green-500

              shadow-lg
            "
          >

            <div className="flex justify-between gap-5 flex-wrap">

              {/* LEFT */}
              <div className="flex-1">

                {/* TITLE */}
                <h2
                  className="
                    text-2xl
                    font-bold

                    text-pink-600
                    dark:text-teal-400
                  "
                >
                  {job.job_title}
                </h2>

                {/* ROLE */}
                <p
                  className="
                    mt-1
                    font-semibold

                    text-purple-600
                    dark:text-cyan-400
                  "
                >
                  {job.job_role}
                </p>

                {/* COMPANY */}
                <div
                  className="
                    flex items-center
                    gap-2
                    mt-2

                    text-gray-700
                    dark:text-gray-300
                  "
                >

                  <Building2 size={16} />

                  {job.employer_name}

                </div>

                {/* LOCATION */}
                <div
                  className="
                    flex items-center
                    gap-2
                    mt-2

                    text-gray-700
                    dark:text-gray-300
                  "
                >

                  <MapPin size={16} />

                  {job.job_city}

                </div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-3 mt-4">

                  <span
                    className="
                      px-3 py-1
                      rounded-full
                      text-xs

                      bg-pink-100
                      dark:bg-teal-500/20

                      text-pink-600
                      dark:text-teal-300
                    "
                  >
                    🎓 {job.batch}
                  </span>

                  <span
                    className="
                      px-3 py-1
                      rounded-full
                      text-xs

                      bg-purple-100
                      dark:bg-cyan-500/20

                      text-purple-600
                      dark:text-cyan-300
                    "
                  >
                    💼 {job.experience}
                  </span>

                  <span
                    className="
                      px-3 py-1
                      rounded-full
                      text-xs

                      bg-gray-100
                      dark:bg-gray-800
                    "
                  >

                    <Briefcase
                      size={12}
                      className="inline mr-1"
                    />

                    {job.job_type}

                  </span>

                </div>

                {/* DESCRIPTION */}
                <p
                  className="
                    mt-4
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  {job.job_description?.slice(0, 180)}...
                </p>

                {/* STATUS */}
                <div
                  className="
                    mt-4
                    inline-flex
                    items-center
                    gap-2

                    px-4 py-2
                    rounded-full

                    bg-green-100
                    dark:bg-green-900/20

                    text-green-700
                    dark:text-green-400

                    text-sm
                    font-semibold
                  "
                >

                  <CheckCircle2 size={16} />

                  Applied Successfully

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col gap-3">

                {/* APPLY */}
                <a
                  href={job.job_apply_link}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    px-5 py-3
                    rounded-2xl

                    flex items-center
                    justify-center
                    gap-2

                    bg-gradient-to-r
                    from-pink-500
                    to-purple-600

                    dark:from-teal-500
                    dark:to-cyan-500

                    text-white
                    font-semibold
                  "
                >

                  <ExternalLink size={18} />

                  Open Job

                </a>

                {/* REMOVE */}
                <button
                  onClick={() =>
                    removeApplied(job._id)
                  }
                  className="
                    px-5 py-3
                    rounded-2xl

                    flex items-center
                    justify-center
                    gap-2

                    bg-red-500
                    hover:bg-red-600

                    text-white
                    font-semibold
                  "
                >

                  <Trash2 size={18} />

                  Withdraw

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}