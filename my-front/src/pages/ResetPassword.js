import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams(); // Token from URL (password reset link)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // You can verify the token if necessary on mount
    // (e.g., by sending a request to the backend to validate the token)
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setError(""); // Reset error
      const response = await fetch(`http://localhost:5001/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Password successfully reset.");
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Your Password</h2>

      <form onSubmit={handleSubmit} className="reset-form">
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            placeholder="Retype new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <button type="submit" className="btn">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
