const Semester = require("../models/Semester");

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
        res.json(semesters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addSemester,
    getSemesters,
};
