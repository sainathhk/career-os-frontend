import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const url = isLogin
        ? "http://127.0.0.1:8000/auth/login"
        : "http://127.0.0.1:8000/auth/signup";

      const res = await axios.post(url, null, {
        params: { email, password },
      });

      if (res.data.error) {
        alert(res.data.error);
        return;
      }

      localStorage.setItem("user_id", res.data.user_id);

      navigate("/chat");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
   <div className="container">
  <div className="card" style={{ textAlign: "center", maxWidth: 400, margin: "auto" }}>

    <h1>CareerOS 🚀</h1>
    <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>

    <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

    <button style={{ width: "100%", marginTop: 15 }} onClick={handleAuth}>
      {isLogin ? "Sign In" : "Sign Up"}
    </button>

    <p
      style={{ marginTop: 10, cursor: "pointer", color: "#a78bfa" }}
      onClick={() => setIsLogin(!isLogin)}
    >
      {isLogin
        ? "Don't have an account? Sign Up"
        : "Already have an account? Sign In"}
    </p>

  </div>
</div>
  );
}