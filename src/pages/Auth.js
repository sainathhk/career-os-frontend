import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


import '../App.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };
  return (
  <div className="auth-container">

    {/* LEFT SIDE */}
    <div className="auth-left">
      <div className="overlay" />
      <div className="left-content">
        <h1>CareerOS 🚀</h1>
        <p>Build your future with AI-powered tools.</p>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="auth-right">
      <div className="form-box">

        <h2>{isLogin ? "Welcome Back 👋" : "Create Account"}</h2>
        <p className="subtitle">
          {isLogin ? "Login to continue" : "Start your journey"}
        </p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleAuth} disabled={loading}>
          {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
        </button>

        <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </p>

      </div>
    </div>
  </div>
);
}