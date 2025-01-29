import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReadReview.css";
const ReadReview = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/feedback/read-reviews");
        console.log(response.data); // Log to check the API response structure
        setData(response.data.reviews); // Assuming response.data.reviews is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="review-container">
      <h1 className="text-2xl font-bold mb-4">Student Reviews</h1>
      {data && data.length > 0 ? (
        data.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))
      ) : (
        <p>No reviews available yet.</p>
      )}
    </div>
  );
}
const ReviewItem = ({ review }) => {
  console.log(review);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="review-box">
      <h2 className="college-name">{review.collegeName || "College Name"}</h2>
      <p className="nickname">
        <strong>{review.nickname || "Anonymous"}</strong> | {review.branch || "Branch"} | {review.yearOfPassing || "Year of Passing"}
      </p>
      <div className="star-rating">⭐⭐⭐⭐⭐</div>
      <div className="review-details">
        <h3>Review Details</h3>
        <div className="review-text">
          <strong>Overall Review:</strong> <span>{review.overallReview ?? "No review provided"}</span>
        </div>
        {isExpanded && (
          <>
            <div className="review-text">
              <strong>Placements:</strong> {review.placements || "No review provided"}
            </div>
            <div className="review-text">
              <strong>Infrastructure:</strong> {review.infrastructure || "No review provided"}
            </div>
            <div className="review-text">
              <strong>Faculty Quality:</strong> {review.facultyQuality || "No review provided"}
            </div>
            <div className="review-text">
              <strong>Curriculum Relevance:</strong> {review.curriculumRelevance || "No review provided"}
            </div>
            <div className="review-text">
              <strong>Hostel Facilities:</strong> {review.hostelFacilities || "No review provided"}
            </div>
            <div className="review-text">
              <strong>Campus Life:</strong> {review.campusLife || "No review provided"}
            </div>
          </>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="read-more-btn"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
};

export default ReadReview;
