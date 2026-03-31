import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


import '../index.css';

export default function Profile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    skills: "",
    projects: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const saveProfile = async () => {
    const user_id = localStorage.getItem("user_id");

    try {
      setLoading(true);

      await axios.post(
        `http://127.0.0.1:8000/profile/update?user_id=${user_id}`,
        {
          personal_info: {
            full_name: form.full_name,
            email: form.email,
            phone: form.phone,
          },
          links: {
            linkedin: form.linkedin,
            github: form.github,
          },
          skills: {
            technical: form.skills.split(","),
          },
          projects: [
            {
              name: "Custom Project",
              description: form.projects,
            },
          ],
        }
      );

      navigate("/chat");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const user_id = localStorage.getItem("user_id");

      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/profile/${user_id}`
        );

        if (res.data) {
          setForm({
            full_name: res.data.personal_info?.full_name || "",
            email: res.data.personal_info?.email || "",
            phone: res.data.personal_info?.phone || "",
            linkedin: res.data.links?.linkedin || "",
            github: res.data.links?.github || "",
            skills: res.data.skills?.technical?.join(",") || "",
            projects: res.data.projects?.[0]?.description || "",
          });
        }
      } catch (err) {
        console.log("No profile yet");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white p-6">

      {/* Back */}
      <button
        onClick={() => navigate("/chat")}
        className="mb-6 text-purple-300 hover:underline"
      >
        ← Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-6">Your Profile 🚀</h1>

        {/* PERSONAL */}
        <Section title="Personal Info">
          <Input placeholder="Full Name" value={form.full_name} onChange={(v) => handleChange("full_name", v)} />
          <Input placeholder="Email" value={form.email} onChange={(v) => handleChange("email", v)} />
          <Input placeholder="Phone" value={form.phone} onChange={(v) => handleChange("phone", v)} />
        </Section>

        {/* LINKS */}
        <Section title="Links">
          <Input placeholder="LinkedIn URL" value={form.linkedin} onChange={(v) => handleChange("linkedin", v)} />
          <Input placeholder="GitHub URL" value={form.github} onChange={(v) => handleChange("github", v)} />
        </Section>

        {/* SKILLS */}
        <Section title="Skills">
          <textarea
            value={form.skills}
            onChange={(e) => handleChange("skills", e.target.value)}
            placeholder="React, Node.js, AI..."
            className="input"
          />
        </Section>

        {/* PROJECTS */}
        <Section title="Projects">
          <textarea
            value={form.projects}
            onChange={(e) => handleChange("projects", e.target.value)}
            placeholder="Describe your best project..."
            className="input"
          />
        </Section>

        {/* SAVE BUTTON */}
        <button
          onClick={saveProfile}
          disabled={loading}
          className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:opacity-90 transition"
        >
          {loading ? "Saving..." : "Save Profile 🚀"}
        </button>
      </motion.div>
    </div>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3 text-purple-300">{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function Input({ placeholder, value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
}