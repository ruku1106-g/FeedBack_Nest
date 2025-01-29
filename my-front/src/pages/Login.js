import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (field === "email") {
        if (!email.trim()) {
          newErrors.email = "Email is required.";
        } else if (!isValidEmail(email.trim())) {
          newErrors.email = "Enter a valid email address.";
        } else {
          newErrors.email = "";
        }
      }

      if (field === "password" && !password.trim()) {
        newErrors.password = "Password is required.";
      }

      return newErrors;
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const newErrors = {
      email: "",
      password: "",
    };
  
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }
  
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }
  
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const user = { email: email.trim(), password };
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      const data = await response.json();
  
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        // Check for specific error message for non-existing user
        if (data.message === 'User does not exist') {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "User does not exist.",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Invalid email or password.",
          }));
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "An error occurred. Please try again.",
      }));
    }
  };
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button className="btn" type="submit">
          Login
        </button>

        <div className="already">
          <p>
            <Link to="/troublewithlogin">Forgot Password?</Link>
          </p>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
