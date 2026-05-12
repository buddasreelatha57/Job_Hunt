import { useState, useEffect } from "react";

export default function Profile() {

  // ================= SAFE USER =================
  const getStoredUser = () => {

    try {

      const data = localStorage.getItem("user");

      if (!data || data === "undefined") {
        return {};
      }

      return JSON.parse(data);

    } catch (err) {

      return {};
    }
  };

  // ================= STATE =================
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    websites: [""],
    photo: ""
  });

  // ================= LOAD USER =================
  useEffect(() => {

    const saved = getStoredUser();

    setUser({
      name: saved.name || "",
      email: saved.email || "",
      phone: saved.phone || "",
      profession: saved.profession || "",
      websites: saved.websites || [""],
      photo: saved.photo || ""
    });

  }, []);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  // ================= PHOTO =================
  const handlePhoto = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setUser({
        ...user,
        photo: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  // ================= ADD WEBSITE =================
  const addWebsite = () => {

    setUser({
      ...user,
      websites: [...(user.websites || []), ""]
    });
  };

  // ================= HANDLE WEBSITE =================
  const handleWebsite = (index, value) => {

    const updated = [...user.websites];

    updated[index] = value;

    setUser({
      ...user,
      websites: updated
    });
  };

  // ================= REMOVE WEBSITE =================
  const removeWebsite = (index) => {

    const updated = user.websites.filter(
      (_, i) => i !== index
    );

    setUser({
      ...user,
      websites: updated.length ? updated : [""]
    });
  };

  // ================= SAVE =================
  const saveProfile = () => {

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert("Profile Saved ✅");
  };

  return (
    <div
      className="
        min-h-screen
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

        relative
        overflow-hidden
      "
    >

      {/* BACKGROUND GLOW */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500/20 dark:bg-teal-500/20 rounded-full blur-3xl animate-pulse" />

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />

      {/* MOVING DOTS */}
      <div className="absolute inset-0 overflow-hidden">

        {[...Array(40)].map((_, i) => (
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

      {/* PROFILE CARD */}
      <div
        className="
          relative
          z-10

          w-full
          max-w-2xl

          p-8

          rounded-3xl

          backdrop-blur-2xl
          bg-white/30
          dark:bg-white/10

          border
          border-white/20

          shadow-2xl
        "
      >

        {/* PROFILE */}
        <div className="text-center mb-8">

          {user.photo ? (

            <img
              src={user.photo}
              alt="profile"
              className="
                w-28
                h-28
                rounded-full
                mx-auto
                object-cover

                border-4
                border-purple-500
                dark:border-teal-400

                shadow-xl
              "
            />

          ) : (

            <div
              className="
                w-28
                h-28
                rounded-full
                mx-auto

                flex
                items-center
                justify-center

                text-4xl
                font-bold
                text-white

                bg-gradient-to-r
                from-pink-500
                to-purple-600

                dark:from-teal-400
                dark:to-cyan-500

                border-4
                border-purple-500
                dark:border-teal-400

                shadow-xl
              "
            >
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>

          )}

          <input
            type="file"
            onChange={handlePhoto}
            className="
              mt-4
              text-sm
              text-gray-700
              dark:text-gray-300
            "
          />

          <h2
            className="
              mt-4
              text-2xl
              font-bold

              bg-gradient-to-r
              from-pink-500
              to-purple-600

              dark:from-teal-400
              dark:to-cyan-500

              bg-clip-text
              text-transparent
            "
          >
            {user.name || "Your Name"}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            {user.profession || "Job Seeker"}
          </p>

        </div>

        {/* INPUTS */}
        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="
              p-4
              rounded-2xl

              bg-white/40
              dark:bg-white/10

              border
              border-white/20

              outline-none

              text-black
              dark:text-white

              placeholder:text-gray-500
            "
          />

          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="
              p-4
              rounded-2xl

              bg-white/40
              dark:bg-white/10

              border
              border-white/20

              outline-none

              text-black
              dark:text-white

              placeholder:text-gray-500
            "
          />

          <input
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="
              p-4
              rounded-2xl

              bg-white/40
              dark:bg-white/10

              border
              border-white/20

              outline-none

              text-black
              dark:text-white

              placeholder:text-gray-500
            "
          />

          <input
            name="profession"
            value={user.profession}
            onChange={handleChange}
            placeholder="Profession"
            className="
              p-4
              rounded-2xl

              bg-white/40
              dark:bg-white/10

              border
              border-white/20

              outline-none

              text-black
              dark:text-white

              placeholder:text-gray-500
            "
          />

        </div>

        {/* WEBSITES */}
        <div className="mt-8">

          <h3 className="text-lg font-semibold text-center mb-4 text-purple-600 dark:text-teal-400">
            Websites & Links
          </h3>

          {(user.websites || []).map((site, i) => (

            <div
              key={i}
              className="flex gap-2 mb-3"
            >

              <input
                value={site}
                onChange={(e) =>
                  handleWebsite(i, e.target.value)
                }
                placeholder="https://your-site.com"
                className="
                  flex-1
                  p-4
                  rounded-2xl

                  bg-white/40
                  dark:bg-white/10

                  border
                  border-white/20

                  outline-none

                  text-black
                  dark:text-white

                  placeholder:text-gray-500
                "
              />

              <button
                onClick={() => removeWebsite(i)}
                className="
                  px-4
                  rounded-2xl

                  bg-red-500
                  hover:bg-red-600

                  text-white
                  font-bold

                  transition
                "
              >
                ✕
              </button>

            </div>

          ))}

        </div>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">

          <button
            onClick={addWebsite}
            className="
              px-6
              py-3
              rounded-2xl

              bg-gradient-to-r
              from-pink-500
              to-purple-600

              dark:from-teal-400
              dark:to-cyan-500

              text-white
              font-semibold

              shadow-lg
              hover:scale-105
              transition
            "
          >
            + Add Website
          </button>

          <button
            onClick={saveProfile}
            className="
              px-6
              py-3
              rounded-2xl

              bg-gradient-to-r
              from-purple-600
              to-pink-500

              dark:from-cyan-500
              dark:to-teal-400

              text-white
              font-semibold

              shadow-lg
              hover:scale-105
              transition
            "
          >
            Save Profile
          </button>

        </div>

      </div>
    </div>
  );
}