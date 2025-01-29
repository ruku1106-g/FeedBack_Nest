const express = require('express');
const PersonalDetails = require('../models/PersonalDetails');
const Review = require('../models/Review');
const router = express.Router();

// POST route to save personal details
router.post('/personal-details', async (req, res) => {
  try {
    const personalDetails = new PersonalDetails(req.body);
    const savedDetails = await personalDetails.save();
    res.status(201).json(savedDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST route to save review
router.post('/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to fetch personal details and reviews
router.get('/read-reviews', async (req, res) => {
  try {
    // Fetch specific fields from PersonalDetails (nickname, usn, branch, year)
    const personalDetails = await PersonalDetails.find({}, 'nickname usn branch year');
    
    // Fetch specific fields from Review (reviewText, rating, usn)
    const reviews = await Review.find({}, 'reviewText rating usn');

    // Combine personal details with their associated reviews
    const combinedData = personalDetails.map((detail) => {
      // Find all reviews associated with the user's `usn`
      const userReviews = reviews.filter((rev) => rev.usn === detail.usn);

      return {
        nickname: detail.nickname,
        usn: detail.usn,
        branch: detail.branch,
        year: detail.year,
        reviews: userReviews.map((rev) => ({
          reviewText: rev.reviewText,
          rating: rev.rating,
        })),
      };
    });

    // Send the combined data as a response
    res.status(200).json({ reviews: combinedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
