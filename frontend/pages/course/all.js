import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function New() {

    const [course, setCourse] = useState([]);
    const router = useRouter()

    const fetchCourse = async () => {
        await fetch('http://localhost:8080/api/Course')
            .then(response => response.json())
            .then(data => setCourse(data))
    }
    useEffect(() => {
        fetchCourse()
    }, [])


    const deleteCourse = async (id) => {
        await fetch('http://localhost:8080/api/Course/' + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(() => router.reload(window.location.pathname));
    }
    return (

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2 mx-auto" style={{marginTop:"5rem"}}>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Course Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            BMS
                        </th>
                        <th scope="col" class="px-6 py-3">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>



                    {course.map(course => {
                        return (
                            <tr key={course.id} class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4">
                                    {course.name}
                                </td>
                                <td class="px-6 py-4">
                                    {course.bms ? "No" : "Yes"}
                                </td>


                                <td class="px-6 py-4 text-right">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { deleteCourse(course.id) }}>Delete</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}

