const express = require("express");
const router = express.Router();
const { addSemester, getSemesters } = require("../controllers/semesterController");

router.post("/", addSemester);
router.get("/", getSemesters);

module.exports = router;
