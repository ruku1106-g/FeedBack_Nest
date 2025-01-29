import React from "react";
import './SignupSuccess.css'; // Ensure this import is correct
import { Link } from "react-router-dom";

const SignupSuccess = () => {
  return (
    <div className="success-container">
      <h2>Signup Successful!</h2>
      <p className="success-message">Thank you for signing up. You can now log in and start exploring.</p>
      <Link to="/login">
        <button className="btn">Go to Login</button>
      </Link>
    </div>
  );
};

export default SignupSuccess;
