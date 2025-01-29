import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Email validation
    if (name === 'email') {
      const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailValidationRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: 'Please enter a valid email address (e.g., example@mail.com).',
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    }

    // Password validation
    if (name === 'password') {
      const passwordErrors = [];
      if (value.length < 8) passwordErrors.push('Must be at least 8 characters long.');
      if (!/[A-Z]/.test(value)) passwordErrors.push('Must include at least one uppercase letter.');
      if (!/[a-z]/.test(value)) passwordErrors.push('Must include at least one lowercase letter.');
      if (!/\d/.test(value)) passwordErrors.push('Must include at least one number.');
      if (!/[@$!%*?&]/.test(value)) passwordErrors.push('Must include at least one special character (@$!%*?&).');
      if (passwordErrors.length > 0) {
        setErrors((prev) => ({ ...prev, password: passwordErrors }));
      } else {
        setErrors((prev) => ({ ...prev, password: '' }));
      }
    }

    // Confirm password validation
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: 'Passwords do not match.',
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    if (!formData.username) formErrors.username = 'Please enter a username';
    if (!formData.email) formErrors.email = 'Please enter email';
    if (!formData.password) formErrors.password = 'Please enter password';
    if (!formData.confirmPassword) formErrors.confirmPassword = 'Please confirm your password';

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        // Check if email exists by calling the /check-email endpoint
        const emailCheckResponse = await fetch('http://localhost:5001/api/auth/check-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email }),
        });

        const emailCheckResult = await emailCheckResponse.json();

        if (emailCheckResult.exists) {
          setErrors((prev) => ({
            ...prev,
            email: 'Email is already registered. Please use a different one.',
          }));
          return; // Stop further execution if email already exists
        }

        // If email doesn't exist, proceed with signup
        const response = await fetch('http://localhost:5001/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });

        const result = await response.json();

        // Check for success response
        if (result.success) {
          alert('Signup successful!');
          navigate('/signup-success'); // Redirect on successful signup
        } else {
          alert('Signup failed: ' + result.message);
        }
      } catch (error) {
        console.error('Error during signup:', error);
        alert('There was an error with the signup. Please try again later.');
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          {errors.username && <small className="error">{errors.username}</small>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && (
            <small className="error">
              {Array.isArray(errors.password)
                ? errors.password.length === 1
                  ? errors.password[0]
                  : errors.password.join(' ') // Join multiple errors into one string
                : errors.password}
            </small>
          )}
        </div>

        <div className="form-group">
          <label>Re-enter Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && <small className="error">{errors.confirmPassword}</small>}
        </div>
        <button className="btn" type="submit">
          Sign Up
        </button>
        <p className="already">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
