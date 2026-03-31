import { useState } from "react";
import axios from "axios";


import '../index.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");


  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const sendJD = async () => {
    const user_id = localStorage.getItem("user_id");

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    setLoading(true);
    const res = await axios.post(
      "http://127.0.0.1:8000/resume/generate",
      {
        user_id: Number(user_id),
        jd: input,
      }
    );
    setResult(res.data);

    const aiMessage = `
🎯 Match Score: ${res.data.match_score}%

✅ Matched Skills:
${res.data.matched_skills.join(", ")}

❌ Missing Skills:
${res.data.missing_skills.join(", ")}

📄 Generated Resume:
${res.data.resume}
  `;


    setLoading(false);
}
  return (
<div style={{ display: "flex", height: "100vh", background: "#0f172a", color: "white" }}>

  {/* SIDEBAR */}
  <div style={{
    width: "250px",
    background: "#020617",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }}>
    <div>
      <h2 style={{ marginBottom: 20 }}>CareerOS</h2>
      <button style={{ width: "100%", marginBottom: 10 }}>+ New Chat</button>
    </div>

    <div>
      <button onClick={() => window.location.href = "/profile"}>Profile</button>
      <button
        onClick={() => {
          localStorage.removeItem("user_id");
          window.location.href = "/";
        }}
        style={{ marginTop: 10 }}
      >
        Logout
      </button>
    </div>
  </div>

  {/* MAIN CHAT AREA */}
  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

    {/* HEADER */}
    <div style={{
      padding: "15px 20px",
      borderBottom: "1px solid #1e293b",
      fontWeight: "bold"
    }}>
      AI Resume Simulator 
    </div>

    {/* CHAT MESSAGES */}
    <div style={{
      flex: 1,
      padding: "20px",
      overflowY: "auto"
    }}>
      {messages.map((m, i) => (
  <div key={i} style={{
    marginBottom: 15,
    display: "flex",
    justifyContent: m.role === "user" ? "flex-end" : "flex-start"
  }}>
    <div style={{
      background: m.role === "user" ? "#6366f1" : "#1e293b",
      padding: "12px 16px",
      borderRadius: "12px",
      maxWidth: "70%",
      whiteSpace: "pre-wrap"
    }}>
      {m.text}
    </div>
  </div>
))}
      {loading && <p>⚡ Generating...</p>}
    </div>

    {/* INPUT BAR */}
    <div style={{
      padding: 20,
      borderTop: "1px solid #1e293b",
      display: "flex"
    }}>
      <input
        style={{
          flex: 1,
          padding: 12,
          borderRadius: 10,
          border: "none",
          background: "#1e293b",
          color: "white"
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste job description..."
      />

      <button
        onClick={sendJD}
        style={{
          marginLeft: 10,
          padding: "0 20px",
          borderRadius: 10,
          background: "#6366f1"
        }}
      >
        Send
      </button>
    </div>
  </div>
</div>
  );
}