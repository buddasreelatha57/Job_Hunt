import { useEffect, useState } from "react";
import axios from "axios";

import {
  BookmarkCheck,
  Building2,
  MapPin,
  Briefcase,
  Trash2
} from "lucide-react";

export default function SavedJobs() {

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  // ================= FETCH SAVED =================
  const fetchSavedJobs = async () => {

    try {

      setLoading(true);

      // GET ALL JOBS
      const res = await axios.get(
        "http://127.0.0.1:5000/api/jobs"
      );

      // GET SAVED IDS
      const savedIds =
        JSON.parse(
          localStorage.getItem("savedJobs")
        ) || [];

      // FILTER SAVED
      const savedJobs = (res.data || []).filter(
        (job) =>
          savedIds.includes(job._id)
      );

      setJobs(savedJobs);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchSavedJobs();

  }, []);

  // ================= REMOVE SAVE =================
  const removeSave = (jobId) => {

    // REMOVE FROM UI
    const updatedJobs =
      jobs.filter((j) => j._id !== jobId);

    setJobs(updatedJobs);

    // UPDATE LOCALSTORAGE
    const savedIds =
      JSON.parse(
        localStorage.getItem("savedJobs")
      ) || [];

    const updatedIds =
      savedIds.filter((id) => id !== jobId);

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedIds)
    );
  };

  // ================= LOADING =================
  if (loading) {

    return (

      <div className="text-center py-20 text-xl">

        Loading Saved Jobs...

      </div>
    );
  }

  return (

    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* TITLE */}
      <div className="flex items-center justify-between mb-8">

        <h1
          className="
            text-3xl
            font-bold

            text-pink-600
            dark:text-teal-400
          "
        >
          Saved Jobs
        </h1>

        <div
          className="
            px-4 py-2
            rounded-full

            bg-yellow-400
            text-black

            font-semibold
          "
        >
          {jobs.length} Saved
        </div>

      </div>

      {/* EMPTY */}
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

          <BookmarkCheck
            size={60}
            className="
              mx-auto mb-4

              text-pink-500
              dark:text-teal-400
            "
          />

          <h2 className="text-2xl font-bold">
            No Saved Jobs
          </h2>

          <p className="text-gray-500 mt-2">
            Save jobs from Jobs page
          </p>

        </div>

      )}

      {/* JOB LIST */}
      <div className="space-y-5">

        {jobs.map((job) => (

          <div
            key={job._id}
            className="
              p-6
              rounded-3xl

              bg-white
              dark:bg-[#0f172a]

              border border-yellow-400

              shadow-lg
            "
          >

            <div className="flex justify-between gap-5 flex-wrap">

              {/* LEFT */}
              <div className="flex-1">

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

                {/* DETAILS */}
                <div className="flex gap-3 flex-wrap mt-4">

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

                    text-center

                    bg-gradient-to-r
                    from-pink-500
                    to-purple-600

                    dark:from-teal-500
                    dark:to-cyan-500

                    text-white
                    font-semibold
                  "
                >
                  Apply Now
                </a>

                {/* REMOVE */}
                <button
                  onClick={() =>
                    removeSave(job._id)
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

                  Remove

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}