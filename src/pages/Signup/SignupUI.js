import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

function SignupUI({ formData, handleChange, handleSubmit, error }) {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">Create an Account</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            name="telephone"
            placeholder="Phone Number"
            value={formData.telephone}
            onChange={handleChange}
          />
          
          <button type="submit">Sign Up</button>
        </form>
        <div className="login-link">
          <span>Already have an account? </span>
          <Link to="/login">Sign In.</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupUI;
