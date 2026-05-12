import { useState, useEffect } from "react";
import {
  Bell,
  MessageCircle
} from "lucide-react";

export default function Navbar({ collapsed }) {

  const [open, setOpen] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    photo: "",
    profession: "",
    websites: []
  });

  // =========================
  // LOAD USER SAFELY
  // =========================
  useEffect(() => {

    const loadUser = () => {

      try {

        const saved = localStorage.getItem("user");

        // NO USER
        if (!saved || saved === "undefined") {

          setUser({
            name: "",
            email: "",
            photo: "",
            profession: "",
            websites: []
          });

          return;
        }

        // SAFE JSON
        const parsedUser = JSON.parse(saved);

        setUser(parsedUser);

      } catch (error) {

        console.log("Invalid user data");

        setUser({
          name: "",
          email: "",
          photo: "",
          profession: "",
          websites: []
        });

      }
    };

    // INITIAL LOAD
    loadUser();

    // STORAGE UPDATE
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };

  }, []);

  // =========================
  // THEME TOGGLE
  // =========================
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      {/* NAVBAR */}
      <div
        className={`
          h-16
          fixed top-0 right-0 z-50
          flex justify-end items-center
          px-6
          backdrop-blur-xl
          bg-white/70 dark:bg-[#020617]/70
          border-b border-gray-200 dark:border-gray-700
          transition-all duration-300

          ${collapsed ? "left-20" : "left-64"}
        `}
      >

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* NOTIFICATION */}
          <div className="relative">

            <Bell
              size={22}
              className="
                cursor-pointer
                text-gray-700 dark:text-white
                hover:text-pink-500
                dark:hover:text-teal-400
                transition
              "
            />

            <span
              className="
                absolute -top-1 -right-1
                w-2 h-2 rounded-full
                bg-red-500
              "
            />

          </div>

          {/* MESSAGE */}
          <MessageCircle
            size={22}
            className="
              cursor-pointer
              text-gray-700 dark:text-white
              hover:text-purple-500
              dark:hover:text-teal-400
              transition
            "
          />

          {/* THEME TOGGLE */}
          <div
            onClick={toggleTheme}
            className="
              w-14 h-7
              rounded-full
              p-1
              flex items-center
              cursor-pointer
              transition

              bg-gradient-to-r
              from-pink-500 to-purple-600

              dark:from-teal-500
              dark:to-cyan-500
            "
          >

            <div
              className="
                w-5 h-5 rounded-full
                bg-white
                transition-all duration-300
                dark:translate-x-7
              "
            />

          </div>

          {/* PROFILE */}
          <div className="relative">

            {/* PROFILE BUTTON */}
            <div
              onClick={() => setOpen(!open)}
              className="
                w-10 h-10 rounded-full
                bg-gradient-to-r
                from-pink-500 to-purple-600
                dark:from-teal-500 dark:to-cyan-500

                flex items-center justify-center
                text-white font-bold
                cursor-pointer
                overflow-hidden

                border-2 border-white
                dark:border-gray-800
              "
            >

              {user?.photo ? (

                <img
                  src={user.photo}
                  alt="profile"
                  className="w-full h-full object-cover"
                />

              ) : (

                <span>
                  {user?.name
                    ? user.name.charAt(0).toUpperCase()
                    : "U"}
                </span>

              )}

            </div>

            {/* DROPDOWN */}
            {open && (

              <div
                className="
                  absolute right-0 mt-3
                  w-72 rounded-3xl p-5

                  backdrop-blur-2xl
                  bg-white/80
                  dark:bg-[#0f172a]/90

                  border border-white/20
                  dark:border-gray-700

                  shadow-2xl
                "
              >

                {/* TOP */}
                <div className="text-center">

                  <div
                    className="
                      w-20 h-20 rounded-full
                      mx-auto

                      bg-gradient-to-r
                      from-pink-500 to-purple-600

                      dark:from-teal-500
                      dark:to-cyan-500

                      flex items-center justify-center
                      text-white text-3xl font-bold
                      overflow-hidden
                    "
                  >

                    {user?.photo ? (

                      <img
                        src={user.photo}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <span>
                        {user?.name
                          ? user.name.charAt(0).toUpperCase()
                          : "U"}
                      </span>

                    )}

                  </div>

                  <h2 className="mt-3 text-lg font-bold dark:text-white">
                    {user?.name || "Guest User"}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {user?.email || "Not Logged In"}
                  </p>

                  <p className="text-xs text-purple-500 dark:text-teal-400 mt-1">
                    {user?.profession || "Job Seeker"}
                  </p>

                </div>

                {/* WEBSITES */}
                {user?.websites?.length > 0 && (

                  <div className="mt-4">

                    <p className="font-semibold text-sm dark:text-white mb-2">
                      Websites
                    </p>

                    <div className="flex flex-col gap-2">

                      {user.websites.map((site, i) => (

                        <div
                          key={i}
                          className="
                            flex items-center justify-between
                            bg-gray-100 dark:bg-gray-800
                            px-3 py-2 rounded-xl
                          "
                        >

                          <a
                            href={site}
                            target="_blank"
                            rel="noreferrer"
                            className="
                              text-blue-500 text-sm
                              truncate hover:underline
                            "
                          >
                            {site}
                          </a>

                          <button
                            onClick={() => {

                              const updated = {
                                ...user,
                                websites: user.websites.filter(
                                  (_, index) => index !== i
                                )
                              };

                              setUser(updated);

                              localStorage.setItem(
                                "user",
                                JSON.stringify(updated)
                              );
                            }}
                            className="
                              text-red-500 text-xs
                              hover:scale-110 transition
                            "
                          >
                            ✕
                          </button>

                        </div>

                      ))}

                    </div>

                  </div>

                )}

                {/* BUTTONS */}
                <div className="flex flex-col gap-2 mt-5">

                  {/* EDIT PROFILE */}
                  <button
                    onClick={() => {

                      if (!user?.email) {

                        alert("Please Login First 🚀");

                        window.location.href = "/login";

                        return;
                      }

                      window.location.href = "/profile";
                    }}
                    className="
                      w-full py-2 rounded-xl

                      bg-gradient-to-r
                      from-pink-500 to-purple-600

                      dark:from-teal-500
                      dark:to-cyan-500

                      text-white font-medium
                    "
                  >
                    Edit Profile
                  </button>

                  {/* LOGIN / LOGOUT */}
                  {!user?.email ? (

                    <button
                      onClick={() => {
                        window.location.href = "/login";
                      }}
                      className="
                        w-full py-2 rounded-xl
                        bg-gray-200 dark:bg-gray-700
                        dark:text-white
                      "
                    >
                      Login / Signup
                    </button>

                  ) : (

                    <button
                      onClick={() => {

                        localStorage.removeItem("user");

                        window.location.href = "/login";
                      }}
                      className="
                        w-full py-2 rounded-xl
                        bg-gray-200 dark:bg-gray-700
                        dark:text-white
                      "
                    >
                      Logout
                    </button>

                  )}

                </div>

              </div>

            )}

          </div>

        </div>

      </div>
    </>
  );
}