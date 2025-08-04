const gradeToPoints = {
    "A": 4.0,
    "B+": 3.5,
    "B": 3.0,
    "C+": 2.5,
    "C": 2.0,
    "D+": 1.5,
    "D": 1.0,
    "F": 0.0
};

function calculateSemesterGPA(courses) {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const course of courses) {
        const points = gradeToPoints[course.grade];
        if (points !== undefined) {
            totalPoints += points * course.creditHours;
            totalCredits += course.creditHours;
        }
    }

    return totalCredits === 0 ? 0 : +(totalPoints / totalCredits).toFixed(2);
}

function calculateCumulativeGPA(semesters) {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const semester of semesters) {
        for (const course of semester.courses) {
            const points = gradeToPoints[course.grade];
            if (points !== undefined) {
                totalPoints += points * course.creditHours;
                totalCredits += course.creditHours;
            }
        }
    }

    return totalCredits === 0 ? 0 : +(totalPoints / totalCredits).toFixed(2);
}

module.exports = { calculateSemesterGPA, calculateCumulativeGPA };
