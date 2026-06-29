import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage({
        text: "Please fill all fields!",
        type: "error",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({
        text: "Passwords do not match!",
        type: "error",
      });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({
        text: "Password must be at least 6 characters!",
        type: "error",
      });
      return;
    }

    try {
      // Dynamic Environment URL target configuration
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

      const res = await fetch(`${apiBaseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password.trim(),
        }),
      });

      if (res.ok) {
        setMessage({
          text: "Registration Successful! Redirecting to Login...",
          type: "success",
        });

        // FIXED: Changed from "/" to "/login" for seamless routing
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        const errorText = await res.text();
        setMessage({
          text: ` ${errorText || "Registration Failed!"}`,
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "Server Connection Failed!",
        type: "error",
      });
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">Join TrendyVibe and start shopping!</p>

        {/* MESSAGE */}
        {message.text && (
          <div className={`alert-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="register-form">
          {/* NAME */}
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* EMAIL */}
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

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* BUTTON */}
          <button className="register-submit-btn" onClick={handleRegister}>
            Register
          </button>

          {/* LOGIN LINK */}
          <p className="login-link">
            Already have an account?{" "}
            {/* FIXED: Changed from "/" to "/login" here as well */}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;