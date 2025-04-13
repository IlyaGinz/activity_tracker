const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    type: String,
    startTime: Date,
    endTime: Date,
    duration: Number, // in seconds
    date: String, // YYYY/MM/DD
    time: String, // HH:MM:SS
    comment: String,
});

module.exports = mongoose.model("Activity", activitySchema);
