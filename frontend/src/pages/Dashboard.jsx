import { useEffect, useState } from "react";
import axios from "axios";

import {
  Briefcase,
  Bookmark,
  CheckCircle2,
  Laptop,
  Building2,
  TrendingUp
} from "lucide-react";

export default function Dashboard() {

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  // ================= FETCH JOBS =================
  const fetchJobs = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "http://127.0.0.1:5000/api/jobs"
      );

      // GET LOCAL STORAGE DATA
      const savedJobs =
        JSON.parse(
          localStorage.getItem("savedJobs")
        ) || [];

      const appliedJobs =
        JSON.parse(
          localStorage.getItem("appliedJobs")
        ) || [];

      // UPDATE JOBS
      const updatedJobs =
        (res.data || []).map((job) => ({
          ...job,
          saved: savedJobs.includes(job._id),
          applied: appliedJobs.includes(job._id),
        }));

      setJobs(updatedJobs);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchJobs();

  }, []);

  // ================= COUNTS =================
  const total =
    jobs.length;

  const saved =
    jobs.filter((j) => j.saved).length;

  const applied =
    jobs.filter((j) => j.applied).length;

  const remote =
    jobs.filter(
      (j) =>
        j.job_type?.toLowerCase() === "remote"
    ).length;

  const onsite =
    jobs.filter(
      (j) =>
        j.job_type?.toLowerCase() === "onsite"
    ).length;

  // ================= LOADING =================
  if (loading) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center

          text-2xl
          font-bold

          text-pink-600
          dark:text-teal-400
        "
      >
        Loading Dashboard...
      </div>
    );
  }

  return (

    <div
      className="
        min-h-screen

        px-4
        py-8

        bg-gray-50
        dark:bg-[#020617]
      "
    >

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto mb-8">

        <h1
          className="
            text-4xl
            font-black

            text-pink-600
            dark:text-teal-400
          "
        >
          Dashboard
        </h1>

        <p
          className="
            mt-2
            text-gray-600
            dark:text-gray-400
          "
        >
          Track your jobs, saved jobs & applications
        </p>

      </div>

      {/* ================= CARDS ================= */}
      <div
        className="
          max-w-6xl
          mx-auto

          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3

          gap-6
        "
      >

        {/* TOTAL */}
        <Card
          title="Total Jobs"
          value={total}
          icon={<Briefcase size={28} />}
          light="from-pink-500 to-purple-600"
          dark="dark:from-teal-500 dark:to-cyan-500"
        />

        {/* SAVED */}
        <Card
          title="Saved Jobs"
          value={saved}
          icon={<Bookmark size={28} />}
          light="from-yellow-400 to-orange-500"
          dark="dark:from-teal-500 dark:to-cyan-500"
        />

        {/* APPLIED */}
        <Card
          title="Applied Jobs"
          value={applied}
          icon={<CheckCircle2 size={28} />}
          light="from-green-500 to-emerald-600"
          dark="dark:from-teal-500 dark:to-cyan-500"
        />

        {/* REMOTE */}
        <Card
          title="Remote Jobs"
          value={remote}
          icon={<Laptop size={28} />}
          light="from-purple-500 to-pink-500"
          dark="dark:from-teal-500 dark:to-cyan-500"
        />

        {/* ONSITE */}
        <Card
          title="Onsite Jobs"
          value={onsite}
          icon={<Building2 size={28} />}
          light="from-blue-500 to-indigo-600"
          dark="dark:from-teal-500 dark:to-cyan-500"
        />

        {/* SUCCESS RATE */}
        <Card
          title="Application Rate"
          value={
            total > 0
              ? `${Math.round(
                  (applied / total) * 100
                )}%`
              : "0%"
          }
          icon={<TrendingUp size={28} />}
          light="from-pink-500 to-rose-600"
          dark="dark:from-teal-500 dark:to-cyan-500"
        />

      </div>

      {/* ================= RECENT JOBS ================= */}
      <div
        className="
          max-w-6xl
          mx-auto

          mt-10

          bg-white
          dark:bg-[#0f172a]

          rounded-3xl

          p-6

          shadow-xl
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-6

            text-pink-600
            dark:text-teal-400
          "
        >
          Recent Jobs
        </h2>

        {jobs.slice(0, 5).map((job) => (

          <div
            key={job._id}
            className="
              flex
              justify-between
              items-center

              border-b
              border-gray-200
              dark:border-gray-700

              py-4
            "
          >

            <div>

              <h3
                className="
                  font-bold
                  text-lg

                  text-black
                  dark:text-white
                "
              >
                {job.job_title}
              </h3>

              <p
                className="
                  text-sm

                  text-gray-600
                  dark:text-gray-400
                "
              >
                {job.employer_name}
                {" • "}
                {job.job_city}
              </p>

            </div>

            <div className="flex gap-2">

              {job.saved && (

                <span
                  className="
                    px-3 py-1
                    rounded-full

                    text-xs
                    font-semibold

                    bg-yellow-100
                    text-yellow-700
                  "
                >
                  Saved
                </span>

              )}

              {job.applied && (

                <span
                  className="
                    px-3 py-1
                    rounded-full

                    text-xs
                    font-semibold

                    bg-green-100
                    text-green-700
                  "
                >
                  Applied
                </span>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

// ================= CARD =================
function Card({
  title,
  value,
  icon,
  light,
  dark
}) {

  return (

    <div
      className={`
        relative
        overflow-hidden

        rounded-3xl

        p-6

        shadow-xl

        text-white

        bg-gradient-to-r
        ${light}
        ${dark}

        hover:scale-105
        transition-all
        duration-300
      `}
    >

      {/* GLOW */}
      <div
        className="
          absolute
          -top-10
          -right-10

          w-40
          h-40

          bg-white/10

          rounded-full
        "
      />

      <div className="relative z-10">

        <div className="mb-4">
          {icon}
        </div>

        <h2 className="text-sm opacity-90">
          {title}
        </h2>

        <p className="text-4xl font-black mt-2">
          {value}
        </p>

      </div>

    </div>
  );
}