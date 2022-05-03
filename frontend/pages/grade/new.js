import React, { useRef, useState, useEffect } from 'react'
import Swal from 'sweetalert2'

export default function New() {
    const gradeRef = useRef("")

    const [student, setStudent] = useState([]);
    const [courses, setCourses] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState([]);


    const handleSubmit = async () => {
        await fetch('http://localhost:8080/api/Grade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "grade": gradeRef.current.value,
                    "student": {
                        "id": selectedStudent.id,
                        "name": selectedStudent.name,
                    },
                    "course": {
                        "id": selectedCourse.id,
                        "name": selectedCourse.name,
                        "bms": selectedCourse.bms
                    }
                })
        })
            .then(response => response.json())
            .then((response) => console.log(response));
    }
    const fetchStudent = async () => {
        await fetch('http://localhost:8080/api/Student')
            .then(response => response.json())
            .then(data => setStudent(data))
    }

    const fetchCourses = async () => {
        await fetch('http://localhost:8080/api/Course')
            .then(response => response.json())
            .then(data => setCourses(data))
    }
    useEffect(() => {
        fetchStudent()
        fetchCourses()
    }, [])


    const handleStudentChange = (e) => {
        setSelectedStudent(student[e.target.value]);
    }

    const handleCourseChange = (e) => {
        setSelectedCourse(courses[e.target.value]);
    }

    return (

        <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mx-auto" style={{ marginTop: "5rem" }}>
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New Grade</h5>
            </a>
            <form>
                <label for="course" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a course</label>
                <select id="course" onChange={handleCourseChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option >Select</option>)
                    {courses.map((course, index) => {
                        return (<option value={index} key={index}>{course.name}</option>)
                    })}
                </select>



                <label for="student" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a student</label>
                <select id="student" onChange={handleStudentChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option >Select</option>)
                    {student.map((student, index) => {
                        return (<option value={index} key={index}>{student.name}</option>)
                    })}
                </select>

                <div className="mb-6">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Grade</label>
                    <input type="number" max="6" min="1" ref={gradeRef} step=".01" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Grade" />
                </div>
                <button type="button" onClick={() => { handleSubmit() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>


    )
}
