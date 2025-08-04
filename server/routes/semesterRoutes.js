const express = require("express");
const router = express.Router();

const Semester = require("../models/Semester"); // or wherever your model is
const { addSemester, getSemesters, updateSemester, deleteSemester } = require("../controllers/semesterController");

router.post("/", addSemester);
router.get("/", getSemesters);
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Semester.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Semester not found" });
        }
        res.json({ message: "Semester deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.put("/:id", async (req, res) => {
    const { semesterName } = req.body;
    try {
        const updated = await Semester.findByIdAndUpdate(req.params.id, { semesterName }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to update semester" });
    }
});
router.put("/:semesterId/courses/:courseId", async (req, res) => {
    const { courseName, creditHours, grade } = req.body;
    try {
        const semester = await Semester.findById(req.params.semesterId);
        if (!semester) return res.status(404).json({ message: "Semester not found" });

        const course = semester.courses.id(req.params.courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        course.courseName = courseName;
        course.creditHours = creditHours;
        course.grade = grade;

        await semester.save();
        res.json({ message: "Course updated", semester });
    } catch (err) {
        res.status(500).json({ message: "Failed to update course" });
    }
});
router.delete("/:semesterId/courses/:courseId", async (req, res) => {
    try {
        const semester = await Semester.findById(req.params.semesterId);
        if (!semester) return res.status(404).json({ message: "Semester not found" });

        semester.courses.id(req.params.courseId).remove();
        await semester.save();

        res.json({ message: "Course deleted successfully", semester });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete course" });
    }
});

module.exports = router;
