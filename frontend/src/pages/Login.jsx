import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  NavLink
} from "react-router-dom";

import {
  Eye,
  EyeOff
} from "lucide-react";

export default function Login() {

  const navigate = useNavigate();

  // ================= SAFE USER =================
  const getStoredUser = () => {

    try {

      const data = localStorage.getItem("user");

      if (!data || data === "undefined") {
        return null;
      }

      return JSON.parse(data);

    } catch (err) {

      return null;
    }
  };

  const storedUser = getStoredUser();

  // ================= STATES =================
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  // ================= LOGIN =================
  const handleLogin = async () => {

    try {

      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:5000/api/auth/login",
        form
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful 🚀");

      navigate("/profile");

    } catch (err) {

      console.log(err);

      alert("Invalid Credentials");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden

        flex
        items-center
        justify-center

        px-4

        bg-gradient-to-br
        from-pink-100
        via-white
        to-purple-100

        dark:from-[#020617]
        dark:via-[#0f172a]
        dark:to-[#111827]
      "
    >

      {/* ================= GLOW EFFECTS ================= */}
      <div
        className="
          absolute
          top-0 left-0
          w-96 h-96
          rounded-full

          bg-pink-500/30
          dark:bg-teal-500/20

          blur-3xl
          animate-pulse
        "
      />

      <div
        className="
          absolute
          bottom-0 right-0
          w-96 h-96
          rounded-full

          bg-purple-500/30
          dark:bg-cyan-500/20

          blur-3xl
          animate-pulse
        "
      />

      {/* ================= MOVING DOTS ================= */}
      <div className="absolute inset-0 overflow-hidden">

        {[...Array(60)].map((_, i) => (

          <span
            key={i}
            className="
              absolute
              w-2 h-2
              rounded-full

              bg-pink-400/40
              dark:bg-teal-400/40

              animate-ping
            "
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />

        ))}

      </div>

      {/* ================= LOGIN CARD ================= */}
      <div
        className="
          relative
          z-10

          w-full
          max-w-md

          p-8

          rounded-[32px]

          backdrop-blur-2xl

          bg-white/30
          dark:bg-white/10

          border
          border-white/20

          shadow-2xl
        "
      >

        {/* ================= LOGO ================= */}
        <div className="flex justify-center mb-5">

          <div
            className="
              w-20 h-20
              rounded-3xl

              bg-gradient-to-r
              from-pink-500
              to-purple-600

              dark:from-teal-500
              dark:to-cyan-500

              flex
              items-center
              justify-center

              shadow-2xl
            "
          >

            <h1 className="text-white text-2xl font-black">
              JH
            </h1>

          </div>

        </div>

        {/* ================= TITLE ================= */}
        <h1
          className="
            text-4xl
            font-black
            text-center

            bg-gradient-to-r
            from-pink-500
            to-purple-600

            dark:from-teal-400
            dark:to-cyan-400

            bg-clip-text
            text-transparent
          "
        >
          Job_Hunt
        </h1>

        <p
          className="
            text-center
            text-sm

            text-gray-600
            dark:text-gray-300

            mt-3
            mb-8
          "
        >
          AI Powered Smart Job Tracker 🚀
        </p>

        {/* ================= EMAIL ================= */}
        <input
          type="email"
          placeholder="Enter Email"
          className="
            w-full
            p-4
            mb-4

            rounded-2xl

            bg-white/40
            dark:bg-white/10

            border
            border-white/20

            outline-none

            text-black
            dark:text-white

            placeholder:text-gray-500
            dark:placeholder:text-gray-400
          "
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        {/* ================= PASSWORD ================= */}
        <div className="relative">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter Password"
            className="
              w-full
              p-4
              mb-6

              rounded-2xl

              bg-white/40
              dark:bg-white/10

              border
              border-white/20

              outline-none

              text-black
              dark:text-white

              placeholder:text-gray-500
              dark:placeholder:text-gray-400
            "
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
          />

          {/* SHOW / HIDE */}
          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
              absolute
              right-4
              top-4

              text-gray-500
              dark:text-gray-300
            "
          >

            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}

          </button>

        </div>

        {/* ================= LOGIN BUTTON ================= */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            py-4

            rounded-2xl

            text-white
            font-semibold

            shadow-xl

            bg-gradient-to-r
            from-pink-500
            to-purple-600

            dark:from-teal-500
            dark:to-cyan-500

            hover:scale-[1.02]
            transition-all
            duration-300
          "
        >

          {loading
            ? "Logging In..."
            : "Login"}

        </button>

        {/* ================= REGISTER ================= */}
        <p
          className="
            text-center
            text-sm

            text-gray-600
            dark:text-gray-300

            mt-6
          "
        >

          Don’t have an account?

          <NavLink
            to="/register"
            className="
              ml-2
              font-semibold

              text-purple-600
              dark:text-teal-400
            "
          >
            Sign Up
          </NavLink>

        </p>

        {/* ================= CONNECTED USER ================= */}
        {storedUser && (

          <div
            className="
              mt-6
              p-4

              rounded-2xl

              bg-gradient-to-r
              from-pink-500/20
              to-purple-500/20

              dark:from-teal-500/20
              dark:to-cyan-500/20

              border
              border-white/20
            "
          >

            <p
              className="
                text-sm
                text-gray-700
                dark:text-gray-200
              "
            >
              Logged in as
            </p>

            <h3
              className="
                font-bold

                text-purple-600
                dark:text-teal-400
              "
            >
              {storedUser?.name || "User"}
            </h3>

          </div>

        )}

      </div>

    </div>
  );
}