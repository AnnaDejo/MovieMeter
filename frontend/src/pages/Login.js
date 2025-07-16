import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showClapperAnimation, setShowClapperAnimation] = useState(false);

  const navigate = useNavigate(); // ✅ React router navigation

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const message = await response.text();

      if (message === "Login successful!") {
        setShowClapperAnimation(true);
        setTimeout(() => {
          navigate("/"); // ✅ Prevents reload, retains session
        }, 3500);
      } else {
        setErrorMessage(message);
        setShowErrorModal(true);
        setTimeout(() => {
          setShowErrorModal(false);
        }, 3000);
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
      }, 3000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-form-title">Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
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

          <button type="submit" className="login-button">Login</button>

          <p className="register-link">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal-backdrop">
          <div className="modal-box error">
            <h3>{errorMessage}</h3>
          </div>
        </div>
      )}

      {/* Clapperboard Animation */}
      {showClapperAnimation && (
        <div className="clapper-animation-screen">
          <div className="clapper-container">
            <BiSolidMoviePlay className="clipboard-icon" />
            <p className="redirecting-text">Redirecting...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
