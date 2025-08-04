import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import deleteIcon from './assets/delete-icon.png'


function App() {
  const [semesters, setSemesters] = useState([])
  const [newSemesterName, setNewSemesterName] = useState('')

  const addSemester = () => {
    const name = newSemesterName.trim() || `Semester #${semesters.length + 1}`
    setSemesters([...semesters, { id: Date.now(), name, courses: [] }])
    setNewSemesterName('')
  }

  const updateSemesterName = (id, newName) => {
    setSemesters((prev) =>
      prev.map((sem) => (sem.id === id ? { ...sem, name: newName } : sem))
    )
  }

  const addCourse = (semesterId) => {
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === semesterId
          ? {
            ...sem,
            courses: [...sem.courses, { id: Date.now(), name: '', credits: 3, grade: '' }],
          }
          : sem
      )
    )
  }

  const updateCourse = (semesterId, courseId, field, value) => {
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === semesterId
          ? {
            ...sem,
            courses: sem.courses.map((c) => (c.id === courseId ? { ...c, [field]: value } : c)),
          }
          : sem
      )
    )
  }

  const deleteCourse = (semesterId, courseId) => {
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === semesterId
          ? {
            ...sem,
            courses: sem.courses.filter((c) => c.id !== courseId),
          }
          : sem
      )
    )
  }

  const deleteSemester = (semesterId) => {
    setSemesters((prev) => prev.filter((sem) => sem.id !== semesterId))
  }

  const getGradePoints = (grade) => {
    const points = {
      A: 4.0,
      'A-': 3.7,
      'B+': 3.3,
      B: 3.0,
      'B-': 2.7,
      'C+': 2.3,
      C: 2.0,
      'C-': 1.7,
      'D+': 1.3,
      D: 1.0,
      F: 0.0,
    }
    return points[grade] ?? null
  }

  const calculateSemesterGPA = (courses) => {
    let totalPoints = 0
    let totalCredits = 0
    courses.forEach(({ credits, grade }) => {
      const points = getGradePoints(grade)
      if (points !== null) {
        totalPoints += points * credits
        totalCredits += +credits
      }
    })
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 'N/A'
  }

  const calculateCumulativeGPA = () => {
    let totalPoints = 0
    let totalCredits = 0
    semesters.forEach((sem) => {
      sem.courses.forEach(({ credits, grade }) => {
        const points = getGradePoints(grade)
        if (points !== null) {
          totalPoints += points * credits
          totalCredits += +credits
        }
      })
    })
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 'N/A'
  }

  const gradeOptions = ['', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F']

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">PSU GPA Tracker</h1>

        <div className="flex justify-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Semester Name (optional)"
            value={newSemesterName}
            onChange={(e) => setNewSemesterName(e.target.value)}
            className="border px-3 py-2 rounded w-64"
          />
          <button
            onClick={addSemester}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Add Semester
          </button>
        </div>

        {semesters.length === 0 ? (
          <p className="text-gray-500">No semesters added yet.</p>
        ) : (
          <>
            {semesters.map((sem) => (
              <div
                key={sem.id}
                className="mb-10 border-t pt-6 text-center flex flex-col items-center"
              >
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={sem.name}
                    onChange={(e) => updateSemesterName(sem.id, e.target.value)}
                    className="text-xl font-semibold mb-4 border-b border-gray-300 p-1 hover:bg-gray-100 rounded outline-none text-center"
                  />
                  <button
                    onClick={() => deleteSemester(sem.id)}
                    className="ml-2 p-1 hover:bg-red-100 rounded"
                  >
                    <img src={deleteIcon} alt="Delete Semester" className="w-6 h-6" />
                  </button>

                </div>

                {sem.courses.map((course) => (
                  <div
                    key={course.id}
                    className="grid grid-cols-4 gap-4 items-center mb-3 w-full max-w-2xl"
                  >
                    <input
                      type="text"
                      placeholder="Course Name"
                      value={course.name}
                      onChange={(e) => updateCourse(sem.id, course.id, 'name', e.target.value)}
                      className="border p-2 rounded"
                    />
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={course.credits}
                      onChange={(e) => updateCourse(sem.id, course.id, 'credits', e.target.value)}
                      className="border p-2 rounded"
                    />
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(sem.id, course.id, 'grade', e.target.value)}
                      className="border p-2 rounded"
                    >
                      {gradeOptions.map((g) => (
                        <option key={g} value={g}>
                          {g || 'Select Grade'}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => deleteCourse(sem.id, course.id)}
                      className="p-0 hover:bg-red-45 rounded"
                    >
                      <img src={deleteIcon} alt="Delete" className="w-6 h-6" />
                    </button>
                  </div>
                ))}

                <div className="flex flex-col items-center">
                  <button
                    onClick={() => addCourse(sem.id)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-1.5 px-4 rounded"
                  >
                    Add Course
                  </button>
                  <p className="mt-2 text-sm text-gray-600">
                    Semester GPA: <strong>{calculateSemesterGPA(sem.courses)}</strong>
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-6 text-xl text-blue-600 font-semibold">
              Cumulative GPA: {calculateCumulativeGPA()}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
