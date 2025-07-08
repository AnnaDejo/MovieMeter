import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /[^a-zA-Z0-9]/.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      setErrors({ ...errors, email: validateEmail(value) ? "" : "Invalid email address" });
    }

    if (name === "password") {
      setErrors({
        ...errors,
        password: validatePassword(value)
          ? ""
          : "Password must be at least 8 characters and contain a special character",
      });
    }

    if (name === "confirmPassword") {
      setErrors({
        ...errors,
        confirmPassword:
          value === form.password ? "" : "Passwords do not match",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (response.ok) {
        setShowSuccessModal(true); // Show modal instead of alert
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Something went wrong");
    }
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h2 className="register-title">Create Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="register-input"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            className="register-input"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="register-input"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}

          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="register-input"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-visibility"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}

          <button type="submit" className="register-button">
            Sign Up
          </button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>

      {/* ✅ Success Modal */}
      {showSuccessModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3>Registration Successful!</h3>
            <p>You can now log in using your credentials.</p>
            <button className="continue-btn" onClick={handleContinue}>
              Continue to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
