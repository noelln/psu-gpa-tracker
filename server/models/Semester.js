const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    creditHours: { type: Number, required: true },
    grade: { type: String, required: true }, // e.g. A, B+, C
});

const semesterSchema = new mongoose.Schema({
    semesterName: { type: String, required: true }, // e.g. "Fall 2024"
    courses: [courseSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Semester", semesterSchema);
