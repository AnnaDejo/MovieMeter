import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password
      }),
    });

    const message = await response.text();
    alert(message);
  } catch (err) {
    console.error("Registration failed:", err);
    alert("Something went wrong");
  }
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
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="register-button">Sign Up</button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
