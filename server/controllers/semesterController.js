const Semester = require("../models/Semester");
const { calculateSemesterGPA, calculateCumulativeGPA } = require("../utils/gpaCalculator");

const addSemester = async (req, res) => {
    try {
        const semester = new Semester(req.body);
        await semester.save();
        res.status(201).json(semester);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getSemesters = async (req, res) => {
    try {
        const semesters = await Semester.find();

        // Add GPA for each semester
        const semestersWithGPA = semesters.map((sem) => {
            const semObj = sem.toObject();
            semObj.semesterGPA = calculateSemesterGPA(semObj.courses);
            return semObj;
        });

        // Calculate total cumulative GPA
        const cumulativeGPA = calculateCumulativeGPA(semesters);

        res.json({ cumulativeGPA, semesters: semestersWithGPA });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addSemester, getSemesters };
