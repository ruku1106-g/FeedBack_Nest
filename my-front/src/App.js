import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./pages/Signup";
import SignupSuccess from "./pages/SignupSuccess";
import Login from "./pages/Login";
import TroubleWithLogin from "./pages/TroubleWithLogin";
import Home from "./pages/Home";
import PersonalDetailsForm from "./pages/PersonalDetailsForm";
import ReviewSystem from "./pages/ReviewSystem";
import ReadReview from './pages/ReadReview';  // Corrected path for ReadReview
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/troublewithlogin" element={<TroubleWithLogin />} />
        <Route path="/PersonalDetailsForm" element={<StepBasedFlow />} />
        <Route path="/ReadReview" element={<ReadReview />} />  {/* Correct route for ReadReview */}
        <Route path="/review" element={<ReviewSystem />} />
      </Routes>
    </Router>
  );
};

const StepBasedFlow = () => {
  const [step, setStep] = useState(1); // Track the current step
  const navigate = useNavigate();

  const goToNextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      navigate("/home"); // Redirect to home or another route after the last step
    }
  };

  return (
    <div>
      {step === 1 && <PersonalDetailsForm onNext={goToNextStep} />}
      {step === 2 && <ReviewSystem onNext={goToNextStep} />}
    </div>
  );
};

export default App;