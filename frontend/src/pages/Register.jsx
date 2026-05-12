import { useState } from "react";
import axios from "axios";

import {
  useNavigate,
  NavLink
} from "react-router-dom";

import {
  Eye,
  EyeOff,
  Smartphone,
  ShieldCheck
} from "lucide-react";

export default function Register() {

  const navigate = useNavigate();

  // ================= FORM =================
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    telegramPhone: ""
  });

  // ================= STATES =================
  const [loading, setLoading] =
    useState(false);

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [otp, setOtp] =
    useState("");

  const [otpSent,
    setOtpSent] =
    useState(false);

  const [verified,
    setVerified] =
    useState(false);

  // ================= SEND OTP =================
  const sendOTP = async () => {

    try {

      if (!form.telegramPhone) {
        return alert(
          "Enter Telegram Number"
        );
      }

      const res = await axios.post(
        "http://127.0.0.1:8000/send-otp",
        {
          phone: form.telegramPhone
        }
      );

      console.log(
        "SEND OTP RESPONSE:",
        res.data
      );

      // SHOW OTP INPUT
      setOtpSent(true);

      alert(
        res.data.message ||
        "OTP Sent Successfully 🚀"
      );

    } catch (err) {

      console.log(err);

      alert(
        err?.response?.data?.message ||
        "Failed To Send OTP"
      );

    }
  };

  // ================= VERIFY OTP =================
  const verifyOTP = async () => {

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/verify-otp",
        {
          phone: form.telegramPhone,
          code: otp
        }
      );

      console.log(
        "VERIFY RESPONSE:",
        res.data
      );

      setVerified(true);

      alert(
        "Telegram Verified ✅"
      );

    } catch (err) {

      console.log(err);

      alert(
        err?.response?.data?.message ||
        "OTP Verification Failed"
      );

    }
  };

  // ================= REGISTER =================
  const handleRegister = async () => {

    try {

      if (!verified) {

        return alert(
          "Please Verify Telegram First"
        );

      }

      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:5000/api/auth/register",
        form
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user || form
        )
      );

      alert(
        "Registered Successfully 🚀"
      );

      navigate("/profile");

    } catch (err) {

      console.log(err);

      alert(
        err?.response?.data?.message ||
        "Register Failed"
      );

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
        justify-center
        items-center

        px-4
        py-10

        bg-gradient-to-br
        from-pink-100
        via-white
        to-purple-100

        dark:from-[#020617]
        dark:via-[#0f172a]
        dark:to-[#111827]
      "
    >

      {/* BACKGROUND GLOW */}
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

      {/* CARD */}
      <div
        className="
          relative
          z-10

          w-full
          max-w-md

          p-6 md:p-8

          rounded-[32px]

          backdrop-blur-2xl

          bg-white/30
          dark:bg-white/10

          border
          border-white/20

          shadow-2xl
        "
      >

        {/* LOGO */}
        <div className="flex justify-center mb-5">

          <div
            className="
              px-6
              py-4

              rounded-3xl

              bg-gradient-to-r
              from-pink-500
              to-purple-600

              dark:from-teal-500
              dark:to-cyan-500
            "
          >

            <h1 className="text-white text-2xl font-black">
              Job_Hunt
            </h1>

          </div>

        </div>

        {/* TITLE */}
        <h2
          className="
            text-3xl md:text-4xl
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
          Create Account
        </h2>

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
          Join AI Powered Job_Hunt 🚀
        </p>

        {/* NAME */}
        <input
          value={form.name}
          placeholder="Full Name"
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
          "
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        {/* EMAIL */}
        <input
          type="email"
          value={form.email}
          placeholder="Email Address"
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
          "
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        {/* PASSWORD */}
        <div className="relative">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={form.password}
            placeholder="Password"
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
            "
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
          />

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

        {/* TELEGRAM SECTION */}
        <div
          className="
            mb-6

            rounded-2xl

            bg-white/40
            dark:bg-white/10

            border
            border-white/20

            p-4
          "
        >

          <div className="flex items-center gap-2 mb-3">

            <Smartphone
              size={18}
              className="
                text-pink-500
                dark:text-teal-400
              "
            />

            <h3
              className="
                font-semibold
                text-gray-700
                dark:text-white
              "
            >
              Telegram Verification
            </h3>

          </div>

          {/* PHONE */}
          <input
            type="text"
            value={form.telegramPhone}
            placeholder="+91 9876543210"
            className="
              w-full
              p-4
              mb-3

              rounded-2xl

              bg-white/50
              dark:bg-white/10

              border
              border-white/20

              outline-none

              text-black
              dark:text-white
            "
            onChange={(e) =>
              setForm({
                ...form,
                telegramPhone:
                  e.target.value
              })
            }
          />

          {/* SEND OTP */}
          {!otpSent && (

            <button
              onClick={sendOTP}
              className="
                w-full
                py-3

                rounded-xl

                text-white
                font-semibold

                bg-gradient-to-r
                from-pink-500
                to-purple-600

                dark:from-teal-500
                dark:to-cyan-500
              "
            >
              Send OTP
            </button>

          )}

          {/* OTP BOX */}
          {otpSent && !verified && (

            <div>

              <input
                value={otp}
                placeholder="Enter OTP"
                className="
                  w-full
                  p-4
                  mt-3

                  rounded-2xl

                  bg-white/50
                  dark:bg-white/10

                  border
                  border-white/20

                  outline-none

                  text-black
                  dark:text-white
                "
                onChange={(e) =>
                  setOtp(e.target.value)
                }
              />

              <button
                onClick={verifyOTP}
                className="
                  w-full
                  py-3
                  mt-3

                  rounded-xl

                  text-white
                  font-semibold

                  bg-green-500
                "
              >
                Verify OTP
              </button>

            </div>

          )}

          {/* VERIFIED */}
          {verified && (

            <div
              className="
                mt-4

                flex
                items-center
                gap-2

                text-green-600
                font-semibold
              "
            >

              <ShieldCheck size={18} />

              Telegram Verified

            </div>

          )}

        </div>

        {/* REGISTER */}
        <button
          onClick={handleRegister}
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
          "
        >

          {loading
            ? "Creating Account..."
            : "Register"}

        </button>

        {/* LOGIN */}
        <p
          className="
            text-center
            text-sm

            text-gray-600
            dark:text-gray-300

            mt-6
          "
        >

          Already have an account?

          <NavLink
            to="/login"
            className="
              ml-2
              font-semibold

              text-purple-600
              dark:text-teal-400
            "
          >
            Login
          </NavLink>

        </p>

      </div>

    </div>
  );
}