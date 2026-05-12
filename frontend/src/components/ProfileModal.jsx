import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ProfileModal({ isOpen, onClose }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    websites: [""],
    photo: ""
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (saved) setUser(saved);
  }, [isOpen]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUser({ ...user, photo: reader.result });
    };

    if (file) reader.readAsDataURL(file);
  };

  const addWebsite = () => {
    setUser({ ...user, websites: [...user.websites, ""] });
  };

  const handleWebsite = (i, value) => {
    const updated = [...user.websites];
    updated[i] = value;
    setUser({ ...user, websites: updated });
  };

  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* 🔥 BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      ></div>

      {/* 🔥 MODAL */}
      <div className="
        relative w-full max-w-xl p-6 rounded-2xl
        bg-white dark:bg-darkcard
        shadow-xl z-50
      ">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3"
        >
          <X />
        </button>

        {/* PROFILE CENTER */}
        <div className="text-center mb-5">

          <img
            src={user.photo || "https://i.pravatar.cc/120"}
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />

          <input type="file" onChange={handlePhoto} className="text-sm" />

          <h2 className="text-lg font-semibold mt-2 text-purple-600">
            {user.name || "Your Name"}
          </h2>
        </div>

        {/* INPUTS */}
        <div className="flex flex-col gap-3">

          <input name="name" value={user.name} onChange={handleChange}
            placeholder="Name"
            className="px-4 py-2 rounded-full bg-gray-100 dark:bg-darkcard outline-none" />

          <input name="email" value={user.email} onChange={handleChange}
            placeholder="Email"
            className="px-4 py-2 rounded-full bg-gray-100 dark:bg-darkcard outline-none" />

          <input name="phone" value={user.phone} onChange={handleChange}
            placeholder="Phone"
            className="px-4 py-2 rounded-full bg-gray-100 dark:bg-darkcard outline-none" />

          <input name="profession" value={user.profession} onChange={handleChange}
            placeholder="Profession"
            className="px-4 py-2 rounded-full bg-gray-100 dark:bg-darkcard outline-none" />
        </div>

        {/* WEBSITES */}
        <div className="mt-4">
          {user.websites.map((site, i) => (
            <input
              key={i}
              value={site}
              onChange={(e) => handleWebsite(i, e.target.value)}
              placeholder="Website"
              className="w-full mb-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-darkcard outline-none"
            />
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-3 mt-4">

          <button
            onClick={addWebsite}
            className="px-4 py-2 rounded-full bg-pink-500 text-white"
          >
            + Website
          </button>

          <button
            onClick={saveProfile}
            className="px-5 py-2 rounded-full bg-purple-600 text-white"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
}