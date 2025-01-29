import React, { useState } from "react";
import './TroubleWithLogin.css';
import { Link } from "react-router-dom";

const TroubleWithLogin = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setError(""); // Reset error
      // Send email to backend for password reset
      const response = await fetch("http://localhost:5001/reset-password-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Password reset link has been sent to your email.");
      } else {
        setError("Failed to send reset link. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="trouble-container">
      <h2>Trouble with logging in?</h2>
      <p>Enter your email address, and we'll send you a link to get back into your account.</p>

      <form onSubmit={handleSubmit} className="trouble-form">
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <button type="submit" className="btn">Send Link</button>
      </form>

      <p>
        <Link to="/signup" className="create-account-link">Create a new account</Link>
      </p>
      <p>
        <Link to="/login" className="back-to-login-link">Back to Login</Link>
      </p>
    </div>
  );
};

export default TroubleWithLogin;
