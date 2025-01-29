import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const ReviewSystem = () => {
  const [placementRating, setPlacementRating] = useState(0);
  const [infraRating, setInfraRating] = useState(0);
  const [facultyRating, setFacultyRating] = useState(0);
  const [curriculumRating, setCurriculumRating] = useState(0);
  const [hostelRating, setHostelRating] = useState(0);
  const [campusLifeRating, setCampusLifeRating] = useState(0);
  const [placementReview, setPlacementReview] = useState("");
  const [infraReview, setInfraReview] = useState("");
  const [facultyReview, setFacultyReview] = useState("");
  const [curriculumReview, setCurriculumReview] = useState("");
  const [hostelReview, setHostelReview] = useState("");
  const [campusLifeReview, setCampusLifeReview] = useState("");
  const [overallRating, setOverallRating] = useState(0);
  const [overallReview, setOverallReview] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviews = [
      placementReview,
      infraReview,
      facultyReview,
      curriculumReview,
      hostelReview,
      campusLifeReview,
      overallReview,
    ];

    const hasShortReviews = reviews.some((review) => review.length < 50);
    if (hasShortReviews) {
      alert("Please provide a review with at least 50 characters for each section.");
      return;
    }

    const reviewData = {
      placementRating,
      infraRating,
      facultyRating,
      curriculumRating,
      hostelRating,
      campusLifeRating,
      overallRating,
      placementReview,
      infraReview,
      facultyReview,
      curriculumReview,
      hostelReview,
      campusLifeReview,
      overallReview,
    };

    try {
      await axios.post('http://localhost:5001/api/feedback/reviews', reviewData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <img
          src="/Thankyouimg.jpeg"
          alt="Thank You"
          style={{ marginBottom: "20px", width: "300px", height: "auto" }}
        />
        <h1>Thank You for Your Review!</h1>
        <p>
          Your review has been submitted successfully. Your feedback helps us
          improve and guide future students!
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#00796b",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  const renderRatingStars = (rating, setRating) => (
    <div style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            fontSize: "24px",
            cursor: "pointer",
            color: rating >= star ? "gold" : "gray",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );

  const renderSection = (title, rating, setRating, review, setReview, questions) => (
    <div style={styles.section}>
      <h3>{title}</h3>
      <p>Rate the {title.toLowerCase()}:</p>
      {renderRatingStars(rating, setRating)}
      <label>
        <strong>Provide feedback:</strong>
        <ul>
          {questions.map((q, index) => (
            <li key={index}>{q}</li>
          ))}
        </ul>
      </label>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder={`Write your review about ${title.toLowerCase()} (minimum 50 characters)...`}
        style={styles.textarea}
      ></textarea>
    </div>
  );
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2>Provide your reviews here</h2>
        {renderSection(
          "Placements",
          placementRating,
          setPlacementRating,
          placementReview,
          setPlacementReview,
          [
            "How effective is the placement cell in providing job opportunities?",
            "What is the average time taken to secure a placement after graduation?",
            "Which industries or domains recruit the most from your college?",
            "Are there any unique placement training programs offered?",
          ]
        )}

        {renderSection(
          "College Infrastructure",
          infraRating,
          setInfraRating,
          infraReview,
          setInfraReview,
          [
            "What is the quality of Wi-Fi in your department?",
            "How well-equipped are the labs and classrooms?",
            "Is there an adequate library facility for students?",
            "Are there any other significant facilities like hostels, canteens, etc.?",
          ]
        )}

        {renderSection(
          "Faculty Quality",
          facultyRating,
          setFacultyRating,
          facultyReview,
          setFacultyReview,
          [
            "How knowledgeable are the faculty members in your course?",
            "How approachable and helpful are the faculty members?",
            "How effective are the teaching methods used by faculty?",
            "Do faculty members incorporate industry trends and real-world applications in their teaching?",
          ]
        )}

        {renderSection(
          "Curriculum Relevance",
          curriculumRating,
          setCurriculumRating,
          curriculumReview,
          setCurriculumReview,
          [
            "Is the curriculum updated regularly to meet current industry standards?",
            "Does the curriculum provide practical knowledge and skill development?",
            "Are there enough industry-specific projects or internships incorporated into the curriculum?",
            "Is there any focus on emerging technologies or domains in your curriculum?",
          ]
        )}

        {renderSection(
          "Hostel Facilities",
          hostelRating,
          setHostelRating,
          hostelReview,
          setHostelReview,
          [
            "How well-maintained are the hostels?",
            "Are there any issues with water supply, electricity, etc.?",
            "How comfortable are the rooms?",
            "Is the food quality in the hostel up to your expectations?",
          ]
        )}

        {renderSection(
          "Campus Life",
          campusLifeRating,
          setCampusLifeRating,
          campusLifeReview,
          setCampusLifeReview,
          [
            "How lively and vibrant is the campus?",
            "Are there enough extracurricular activities and events?",
            "What’s the student culture like at the college?",
            "Is the campus well-connected with transportation options?",
          ]
        )}

        {renderSection(
          "Overall Review",
          overallRating,
          setOverallRating,
          overallReview,
          setOverallReview,
          ["Summarize your overall experience in the college."]
        )}

        <div style={styles.submitButtonContainer}>
          <button onClick={handleSubmit} style={styles.submitButton}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: "white", minHeight: "100vh" , marginTop:"3500px"},
  content: { maxWidth: "1200px", margin: "0 auto", padding: "20px" },
  section: {
    marginBottom: "30px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    marginTop: "10px",
  },
  starContainer: { display: "flex", gap: "10px", marginBottom: "20px" },
  textarea: {
    width: "100%",
    height: "150px",
    marginTop: "10px",
    padding: "10px",
    fontSize: "16px",
  },
  submitButtonContainer: { display: "flex", justifyContent: "center", marginTop: "20px" },
  submitButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#00796b",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ReviewSystem;
