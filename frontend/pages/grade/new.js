import React, { useRef,useState,useEffect } from 'react'
import Swal from 'sweetalert2'

export default function New() {
    const nameRef = useRef("")
    const studentRef = useRef("")
    const courseRef = useRef("")

    const [student, setStudent] = useState([]);
    const [courses, setCourses] = useState([]);

    const handleSubmit = async () => {
        await fetch('http://localhost:8080/api/Grade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { 
                    "student": studentRef.current.value ,
                    
                })
        })
            .then(response => response.json())
            .then(() => Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
            ));
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

    return (

        <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New Grade</h5>
            </a>
            <form>
                <label for="course" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a course</label>
                <select id="course" ref={courseRef} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {courses.map(course => {
                        return (<option value={course.id}>{course.name}</option>)
                    })}
                </select>

                <label for="student" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a student</label>
                <select id="student"  ref={studentRef} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {student.map(student => {
                        return (<option value={student.id}>{student.name}</option>)
                    })}
                </select>

                <div className="mb-6">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Grade</label>
                    <input type="number" ref={nameRef} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Student Name" />
                </div>
                <button type="button" onClick={() => { handleSubmit() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>


    )
}
