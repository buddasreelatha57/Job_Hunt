import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Search,
  MapPin,
  Briefcase,
  CalendarDays,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Building2,
  Pencil,
  X
} from "lucide-react";

export default function Jobs() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  const [cityFilter, setCityFilter] = useState("");

  const [typeFilter, setTypeFilter] = useState("");

  const [dateFilter, setDateFilter] = useState("");

  const [expanded, setExpanded] = useState({});

  const [editingJob, setEditingJob] = useState(null);

  const [editData, setEditData] = useState({
    job_title: "",
    employer_name: "",
    job_role: "",
    experience: "",
    batch: "",
    job_city: "",
    job_type: ""
  });

  // ================= FETCH JOBS =================
  const fetchJobs = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:5000/api/jobs"
      );

      const savedJobs =
        JSON.parse(localStorage.getItem("savedJobs")) || [];

      const appliedJobs =
        JSON.parse(localStorage.getItem("appliedJobs")) || [];

      const updated = (res.data || []).map((job) => ({
        ...job,
        saved: savedJobs.includes(job._id),
        applied: appliedJobs.includes(job._id)
      }));

      setJobs(updated);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {

    fetchJobs();

  }, []);

  // ================= SAVE =================
  const toggleSave = (job) => {

    const updatedJobs = jobs.map((j) =>
      j._id === job._id
        ? { ...j, saved: !j.saved }
        : j
    );

    setJobs(updatedJobs);

    const savedIds = updatedJobs
      .filter((j) => j.saved)
      .map((j) => j._id);

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(savedIds)
    );
  };

  // ================= APPLIED =================
  const toggleApplied = (job) => {

    const updatedJobs = jobs.map((j) =>
      j._id === job._id
        ? { ...j, applied: !j.applied }
        : j
    );

    setJobs(updatedJobs);

    const appliedIds = updatedJobs
      .filter((j) => j.applied)
      .map((j) => j._id);

    localStorage.setItem(
      "appliedJobs",
      JSON.stringify(appliedIds)
    );
  };

  // ================= EXPAND =================
  const toggleExpand = (id) => {

    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // ================= OPEN EDIT =================
  const openEdit = (job) => {

    setEditingJob(job);

    setEditData({
      job_title: job.job_title || "",
      employer_name: job.employer_name || "",
      job_role: job.job_role || "",
      experience: job.experience || "",
      batch: job.batch || "",
      job_city: job.job_city || "",
      job_type: job.job_type || ""
    });
  };

  // ================= SAVE EDIT =================
  const saveEdit = () => {

    const updated = jobs.map((j) =>
      j._id === editingJob._id
        ? {
            ...j,
            ...editData
          }
        : j
    );

    setJobs(updated);

    setEditingJob(null);

    alert("Job Updated ✅");
  };

  // ================= FILTER =================
  const uniqueCities = [
    ...new Set(jobs.map((j) => j.job_city))
  ];

  const filteredJobs = jobs
    .filter((j) =>
      j.job_title?.toLowerCase().includes(search.toLowerCase()) ||

      j.employer_name?.toLowerCase().includes(search.toLowerCase()) ||

      j.job_role?.toLowerCase().includes(search.toLowerCase()) ||

      j.experience?.toLowerCase().includes(search.toLowerCase()) ||

      j.batch?.toLowerCase().includes(search.toLowerCase())
    )

    .filter((j) =>
      cityFilter
        ? j.job_city === cityFilter
        : true
    )

    .filter((j) =>
      typeFilter
        ? j.job_type === typeFilter
        : true
    )

    .filter((j) => {

      if (!dateFilter) return true;

      const diff =
        (new Date() - new Date(j.createdAt))
        /
        (1000 * 60 * 60 * 24);

      if (dateFilter === "today")
        return diff < 1;

      if (dateFilter === "week")
        return diff <= 7;

      if (dateFilter === "month")
        return diff <= 30;

      return true;
    });

  return (

    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* ================= SEARCH BAR ================= */}
      <div
        className="
          flex flex-wrap lg:flex-nowrap
          gap-3
          mb-8

          p-4

          rounded-3xl

          shadow-xl

          bg-white
          dark:bg-[#0f172a]

          border border-gray-200
          dark:border-gray-700
        "
      >

        {/* SEARCH */}
        <div
          className="
            flex items-center
            flex-1

            px-4 py-3

            rounded-2xl

            bg-gray-100
            dark:bg-[#1e293b]
          "
        >

          <Search
            size={18}
            className="
              text-pink-500
              dark:text-teal-400
            "
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search jobs..."
            className="
              ml-3
              w-full
              bg-transparent
              outline-none

              text-black
              dark:text-white
            "
          />

        </div>

        {/* CITY */}
        <div
          className="
            flex items-center
            gap-2

            px-4 py-3

            rounded-2xl

            bg-gray-100
            dark:bg-[#1e293b]
          "
        >

          <MapPin
            size={18}
            className="
              text-pink-500
              dark:text-teal-400
            "
          />

          <select
            onChange={(e) =>
              setCityFilter(e.target.value)
            }
            className="
              bg-transparent
              outline-none

              text-black
              dark:text-black
            "
          >

            <option value="">
              City
            </option>

            {uniqueCities.map((c, i) => (
              <option key={i}>
                {c}
              </option>
            ))}

          </select>

        </div>

        {/* TYPE */}
        <div
          className="
            flex items-center
            gap-2

            px-4 py-3

            rounded-2xl

            bg-gray-100
            dark:bg-[#1e293b]
          "
        >

          <Briefcase
            size={18}
            className="
              text-pink-500
              dark:text-teal-400
            "
          />

          <select
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
            className="
              bg-transparent
              outline-none

              text-black
              dark:text-black
            "
          >

            <option value="">
              Type
            </option>

            <option value="remote">
              Remote
            </option>

            <option value="onsite">
              Onsite
            </option>

          </select>

        </div>

        {/* DATE */}
        <div
          className="
            flex items-center
            gap-2

            px-4 py-3

            rounded-2xl

            bg-gray-100
            dark:bg-[#1e293b]
          "
        >

          <CalendarDays
            size={18}
            className="
              text-pink-500
              dark:text-teal-400
            "
          />

          <select
            onChange={(e) =>
              setDateFilter(e.target.value)
            }
            className="
              bg-transparent
              outline-none

              text-black
              dark:text-black
            "
          >

            <option value="">
              Date
            </option>

            <option value="today">
              Today
            </option>

            <option value="week">
              7 Days
            </option>

            <option value="month">
              30 Days
            </option>

          </select>

        </div>

      </div>

      {/* ================= JOBS ================= */}
      <div className="space-y-5">

        {filteredJobs.map((job) => {

          const isExpanded =
            expanded[job._id];

          return (

            <div
              key={job._id}
              className={`
                p-6
                rounded-3xl
                shadow-lg
                border

                ${
                  job.applied
                    ? "border-green-500 bg-green-50 dark:bg-green-900/10"
                    : job.saved
                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
                    : "bg-white dark:bg-[#0f172a] border-gray-200 dark:border-gray-700"
                }
              `}
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
                      dark:text-teal-300
                    "
                  >
                    {job.job_role}
                  </p>

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

                        text-black
                        dark:text-white
                      "
                    >
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
                    {isExpanded
                      ? job.job_description
                      : `${job.job_description?.slice(0, 150)}...`}
                  </p>

                  {job.job_description?.length > 150 && (

                    <button
                      onClick={() =>
                        toggleExpand(job._id)
                      }
                      className="
                        mt-2
                        text-blue-500
                        text-sm
                      "
                    >
                      {isExpanded
                        ? "Show Less"
                        : "Show More"}
                    </button>

                  )}

                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-3">

                  {/* SAVE */}
                  <button
                    onClick={() =>
                      toggleSave(job)
                    }
                    className={`
                      px-4 py-3
                      rounded-2xl

                      flex items-center
                      justify-center
                      gap-2

                      font-semibold

                      ${
                        job.saved
                          ? "bg-yellow-400 text-black"
                          : "bg-pink-500 dark:bg-teal-500 text-white"
                      }
                    `}
                  >

                    {job.saved ? (
                      <BookmarkCheck size={18} />
                    ) : (
                      <Bookmark size={18} />
                    )}

                    {job.saved
                      ? "Saved"
                      : "Save"}

                  </button>

                  {/* APPLIED */}
                  <button
                    onClick={() =>
                      toggleApplied(job)
                    }
                    className={`
                      px-4 py-3
                      rounded-2xl

                      flex items-center
                      justify-center
                      gap-2

                      font-semibold

                      ${
                        job.applied
                          ? "bg-green-500 text-white"
                          : "bg-purple-500 dark:bg-cyan-500 text-white"
                      }
                    `}
                  >

                    <CheckCircle2 size={18} />

                    {job.applied
                      ? "Applied"
                      : "Mark Applied"}

                  </button>

                  {/* EDIT */}
                  <button
                    onClick={() =>
                      openEdit(job)
                    }
                    className="
                      px-4 py-3
                      rounded-2xl

                      flex items-center
                      justify-center
                      gap-2

                      bg-gradient-to-r
                      from-pink-500
                      to-purple-600

                      dark:from-teal-500
                      dark:to-cyan-500

                      text-black
                      font-semibold
                    "
                  >

                    <Pencil size={16} />

                    Edit

                  </button>

                  {/* RESUME */}
                  <button
                    onClick={() =>
                      navigate("/resume")
                    }
                    className="
                      px-4 py-3
                      rounded-2xl

                      bg-blue-500
                      text-white
                    "
                  >
                    Resume ATS
                  </button>

                  {/* APPLY */}
                  <a
                    href={job.job_apply_link}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      px-4 py-3
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

                </div>

              </div>

            </div>

          );
        })}

      </div>

      {/* ================= EDIT MODAL ================= */}
      {editingJob && (

        <div
          className="
            fixed inset-0
            bg-black/50
            text-black
            

            flex
            items-center
            justify-center

            z-50
          "
        >

          <div
            className="
              w-full
              max-w-lg

              p-6

              rounded-3xl

              bg-white
              dark:bg-[#0f172a]

              shadow-2xl
            "
          >

            <div className="flex justify-between mb-5">

              <h2
                className="
                  text-2xl
                  font-bold

                  text-pink-600
                  dark:text-teal-400
                "
              >
                Edit Job
              </h2>

              <button
                onClick={() =>
                  setEditingJob(null)
                }
              >
                <X />
              </button>

            </div>

            <div className="space-y-4">

              <input
                value={editData.job_title}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    job_title: e.target.value
                  })
                }
                placeholder="Job Title"
                className="w-full p-3 rounded-xl border"
              />

              <input
                value={editData.employer_name}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    employer_name: e.target.value
                  })
                }
                placeholder="Company"
                className="w-full p-3 rounded-xl border"
              />

              <input
                value={editData.job_role}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    job_role: e.target.value
                  })
                }
                placeholder="Role"
                className="w-full p-3 rounded-xl border"
              />

              <input
                value={editData.experience}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    experience: e.target.value
                  })
                }
                placeholder="Experience"
                className="w-full p-3 rounded-xl border"
              />

              <input
                value={editData.batch}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    batch: e.target.value
                  })
                }
                placeholder="Batch"
                className="w-full p-3 rounded-xl border"
              />

              <input
                value={editData.job_city}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    job_city: e.target.value
                  })
                }
                placeholder="Location"
                className="w-full p-3 rounded-xl border"
              />

              <input
                value={editData.job_type}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    job_type: e.target.value
                  })
                }
                placeholder="Job Type"
                className="w-full p-3 rounded-xl border"
              />

              <button
                onClick={saveEdit}
                className="
                  w-full
                  py-3
                  rounded-2xl

                  bg-gradient-to-r
                  from-pink-500
                  to-purple-600

                  dark:from-teal-500
                  dark:to-cyan-500

                  text-white
                  font-semibold
                "
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}