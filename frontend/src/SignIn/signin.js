import React, { useState } from 'react';
import './signin.css';

function Signin() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Sign in submitted');
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In to Moviemeter</h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign In</button>

        <div className="signin-links">
          <p>
            <a href="#">Forgot Password?</a>
          </p>
          <p>
            Don't have an account?
            <a href="#"> Sign up</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signin;
