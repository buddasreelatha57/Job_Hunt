
import { NavLink } from "react-router-dom";
import {
  User,
  Briefcase,
  Heart,
  Send,
  BarChart,
  PanelLeft,
  X,
  FileText
} from "lucide-react";

import logo from "../assets/logo.jpeg";

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed
}) {

  // SAFE USER
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const menu = [
    { name: "Jobs", path: "/", icon: <Briefcase size={18} /> },
    { name: "Saved", path: "/saved", icon: <Heart size={18} /> },
    { name: "Applied", path: "/applied", icon: <Send size={18} /> },
    { name: "Dashboard", path: "/dashboard", icon: <BarChart size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
    { name: "Resume", path: "/resume", icon: <FileText size={18} /> },
  ];

  return (
    <>
      {/* MOBILE BACKDROP */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 z-50

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }

          ${collapsed ? "w-20" : "w-64"}

          h-screen
          backdrop-blur-xl

          bg-white/80
          dark:bg-[#020617]/90

          border-r border-gray-200 dark:border-gray-700

          transition-all duration-300
          shadow-xl
        `}
      >

        {/* TOP */}
        <div
          className="
            h-16
            flex items-center justify-between
            px-4
            border-b border-gray-200 dark:border-gray-700
          "
        >

          {/* LOGO */}
          <div className="flex items-center gap-2">

            <img
              src={logo}
              alt="logo"
              className="w-9 h-9"
            />

            {!collapsed && (
              <h2 className="font-bold text-xl text-purple-600 dark:text-teal-400">
                Job_Hunt
              </h2>
            )}
          </div>

          {/* TOGGLES */}
          <div className="flex items-center gap-2">

            {/* DESKTOP */}
            <PanelLeft
              size={20}
              onClick={() => setCollapsed(!collapsed)}
              className="
                hidden md:block
                cursor-pointer
                text-gray-700 dark:text-white
              "
            />

            {/* MOBILE */}
            <X
              size={20}
              onClick={() => setMobileOpen(false)}
              className="
                md:hidden
                cursor-pointer
                text-gray-700 dark:text-white
              "
            />

          </div>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-2 p-4 mt-2">

          {menu.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3
                px-3 py-3 rounded-xl

                transition-all duration-200

                ${
                  isActive
                    ? `
                      bg-gradient-to-r
                      from-pink-500 to-purple-600
                      dark:from-teal-500 dark:to-cyan-600

                      text-white
                      shadow-lg
                    `
                    : `
                      text-gray-700 dark:text-gray-200
                      hover:bg-pink-100
                      dark:hover:bg-gray-800
                    `
                }
              `}
            >

              <div>{item.icon}</div>

              {!collapsed && (
                <span className="font-medium text-sm">
                  {item.name}
                </span>
              )}

            </NavLink>
          ))}

        </div>

        {/* FOOTER / AUTH */}
        {!collapsed && (

          <div className="absolute bottom-5 left-4 right-4">

            {/* NOT LOGGED IN */}
            {!user ? (

              <div className="flex flex-col gap-3">

                {/* LOGIN */}
                <NavLink
                  to="/login"
                  className="
                    w-full py-3 rounded-xl
                    text-center font-semibold

                    bg-gradient-to-r
                    from-pink-500 to-purple-600
                    dark:from-teal-500 dark:to-cyan-600

                    text-white
                    shadow-lg

                    hover:scale-105
                    transition
                  "
                >
                  Login
                </NavLink>

                {/* REGISTER */}
                <NavLink
                  to="/register"
                  className="
                    w-full py-3 rounded-xl
                    text-center font-semibold

                    border-2
                    border-purple-500
                    dark:border-teal-400

                    text-purple-600
                    dark:text-teal-300

                    hover:bg-purple-500
                    hover:text-white

                    dark:hover:bg-teal-500

                    transition
                  "
                >
                  Sign Up
                </NavLink>

              </div>

            ) : (

              /* LOGGED IN */
              <div
                className="
                  p-4 rounded-2xl

                  bg-gradient-to-r
                  from-pink-500 to-purple-600
                  dark:from-teal-500 dark:to-cyan-600

                  text-white
                  shadow-xl

                  flex items-center justify-between
                "
              >

                {/* USER NAME */}
                <div>

                  <h3 className="font-bold text-sm">
                    {user?.name || "User"}
                  </h3>

                  <p className="text-xs opacity-90">
                    Logged In
                  </p>

                </div>

                {/* LOGOUT */}
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}
                  className="
                    px-3 py-1 rounded-lg

                    bg-black/20

                    text-xs font-medium

                    hover:bg-black/30

                    transition
                  "
                >
                  Logout
                </button>

              </div>

            )}

          </div>

        )}

      </div>
    </>
  );
}