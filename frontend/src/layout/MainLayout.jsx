import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function MainLayout() {

  const [mobileOpen, setMobileOpen] = useState(false);

  // DESKTOP SIDEBAR COLLAPSE
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-[#020617]">

      {/* SIDEBAR */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}

        // 🔥 IMPORTANT
        setCollapsed={setCollapsed}
      />

      {/* MAIN */}
      <div
        className={`
          transition-all duration-300

          ${collapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >

        {/* NAVBAR */}
        <Navbar
          setMobileOpen={setMobileOpen}
          collapsed={collapsed}
        />

        {/* CONTENT */}
        <div className="pt-20 p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}