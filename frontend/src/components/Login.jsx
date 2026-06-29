import "./Login.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation tracker

function Login() {
  const navigate = useNavigate();
  const location = useLocation(); // Instantiated router memory location tracker
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setMessage({ text: "Please fill all fields!", type: "error" });
      return;
    }

    try {
      // Dynamic Environment URL configuration
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

      const res = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password.trim(),
        }),
      });

      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { data = text; }

      if (res.ok) {
        localStorage.setItem("tv_token", data.token);
        localStorage.setItem("tv_user", JSON.stringify({
          name: data.name,
          email: data.email,
          role: data.role,
          id: data.id || 1 // Fallback safe fallback user identity key map
        }));

        window.dispatchEvent(new Event("local-login"));

        setMessage({ text: "Login Successful!", type: "success" });
        
        setTimeout(() => {
          if (data.role === "ADMIN") {
            navigate("/admin");
          } else {
            // FIXED: Wishlist clicks custom paths check template!
            const redirectUrl = location.state?.from || "/";
            navigate(redirectUrl);
          }
        }, 1500);
      } else {
        setMessage({ text: "Invalid email or password!", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Server connection failed!", type: "error" });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">Trendy<span>Vibe</span></div>
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Login to continue shopping </p>

        {message.text && (
          <div className={`alert-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className="login-submit-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="register-link">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;