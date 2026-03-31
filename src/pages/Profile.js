import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";



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

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const saveProfile = async () => {
    const user_id = localStorage.getItem("user_id");

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
  };

  useEffect(() => {
  const fetchProfile = async () => {
    const user_id = localStorage.getItem("user_id");

    try {
      const res = await axios.get(`http://127.0.0.1:8000/profile/${user_id}`);
      console.log(res)

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
  <div className="container">
  <button onClick={() => navigate("/chat")}>← Back</button>

  <div className="card">
    <h2>Your Profile</h2>

    <input placeholder="Full Name" value={form.full_name} onChange={(e) => handleChange("full_name", e.target.value)} />
    <input placeholder="Email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
    <input placeholder="Phone" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />

    <input placeholder="LinkedIn" value={form.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} />
    <input placeholder="GitHub" value={form.github} onChange={(e) => handleChange("github", e.target.value)} />

    <textarea placeholder="Skills (comma separated)" value={form.skills} onChange={(e) => handleChange("skills", e.target.value)} />
    <textarea placeholder="Projects description" value={form.projects} onChange={(e) => handleChange("projects", e.target.value)} />

    <button style={{ marginTop: 15 }} onClick={saveProfile}>
      Save Profile 🚀
    </button>
  </div>
</div>
  );
}