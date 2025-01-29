import React, { useState } from "react";
import axios from "axios";

const PersonalDetailsForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    nickname: "",
    college: "",
    branch: "",
    yearOfCompletion: "",
    usn: "", 
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission
  const [usnError, setUsnError] = useState(""); // State to track USN validation error
  const [emailError, setEmailError] = useState(""); // State to track Email validation error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateUsn = (usn) => {
    // USN pattern: 1JS21CS169 (e.g., 1JS21CS169)
    const usnPattern = /^[1-9][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/;
    return usnPattern.test(usn);
  };

  const validateEmail = (email) => {
    // Basic email pattern
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate USN format
    if (!validateUsn(formData.usn)) {
      setUsnError("Please enter a valid USN");
      return;
    } else {
      setUsnError(""); // Reset error if USN is valid
    }

    // Validate Email format
    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError(""); // Reset error if email is valid
    }

    try {
      // Send form data to the backend
      await axios.post("http://localhost:5001/api/feedback/personal-details", formData);
      setIsSubmitted(true); // Show "Login Successful" message
      setTimeout(() => {
        onNext(); // Navigate to the ReviewSystem page after 1 second
      }, 1000);
    } catch (error) {
      console.error("Error submitting personal details:", error);
    }
  };

  return (
    <div className="personal-details-container">
      <div
        style={{
          backgroundColor: "#E0F7FA",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1>Personal Details</h1>
          <h3 style={{ marginTop: "10px", color: "#555" }}>Tell us who you are</h3>
          <p
            style={{
              marginBottom: "20px",
              color: "#777",
              fontSize: "16px",
            }}
          >
            Please give us a few basic details about yourself, which we will verify.
          </p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="usn"
                placeholder="USN (University Serial Number)"
                value={formData.usn}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                }}
                required
              />
              {usnError && (
                <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                  {usnError}
                </p>
              )}
            </div>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                }}
                required
              />
              {emailError && (
                <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                  {emailError}
                </p>
              )}
            </div>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="nickname"
                placeholder="Nickname"
                value={formData.nickname}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                }}
              />
              <p style={{ color: "#555", fontSize: "14px" }}>
                (Name that will be displayed)
              </p>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="college"
                placeholder="College You Are Reviewing"
                value={formData.college}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="branch"
                placeholder="Branch"
                value={formData.branch}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <select
                name="yearOfCompletion"
                value={formData.yearOfCompletion}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                }}
                required
              >
                <option value="" disabled>
                  Select Year of Completion
                </option>
                {Array.from({ length: 2025 - 2000 + 1 }, (_, i) => {
                  const year = 2025 - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Next
            </button>
          </form>
          {isSubmitted && (
            <p
              style={{
                marginTop: "15px",
                color: "green",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Login Successful!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
