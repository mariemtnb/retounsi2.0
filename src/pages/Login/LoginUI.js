import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function LoginUI({ formData, handleChange, handleSubmit, error }) {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Welcome Back!</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email."
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password."
            value={formData.password}
            onChange={handleChange}
          />
          <div className="reset-password">
            <Link to="/reset-password">Reset password.</Link>
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div className="signup-link">
          <span>Don't have an account?  </span>
          <Link to="/register">Sign Up.</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginUI;
