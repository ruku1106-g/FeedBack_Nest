const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    overallReview: { type: String, required: true },
    
    // Ratings fields (numeric, required or not based on your need)
    placementRating: { type: Number, required: true },  // Rating for placements
    infraRating: { type: Number, required: true },      // Rating for college infrastructure
    facultyRating: { type: Number, required: true },    // Rating for faculty quality
    curriculumRating: { type: Number, required: true }, // Rating for curriculum relevance
    hostelRating: { type: Number, required: true },     // Rating for hostel facilities
    campusLifeRating: { type: Number, required: true }, // Rating for campus life

    // Review fields (text feedback)
    placementReview: { type: String, required: false },     // Review for placements
    infraReview: { type: String, required: false },         // Review for infrastructure
    facultyReview: { type: String, required: false },       // Review for faculty
    curriculumReview: { type: String, required: false },    // Review for curriculum
    hostelReview: { type: String, required: false },        // Review for hostel
    campusLifeReview: { type: String, required: false }     // Review for campus life
});

module.exports = mongoose.model('Review', reviewSchema);
