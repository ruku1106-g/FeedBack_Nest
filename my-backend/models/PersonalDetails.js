const mongoose = require('mongoose');

const personalDetailsSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    nickname: { type: String, required: true },
    college: { type: String, required: true },
    branch: { type: String, required: true },
    yearOfCompletion: { type: Number, required: true },
    usn: { type: String, required: true }
});

module.exports = mongoose.model('PersonalDetails', personalDetailsSchema);
