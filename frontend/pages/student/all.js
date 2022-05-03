import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function New() {

    const [student, setStudent] = useState([]);
    const router = useRouter()

    const fetchStudent = async () => {
        await fetch('http://localhost:8080/api/Student')
            .then(response => response.json())
            .then(data => setStudent(data))
    }
    useEffect(() => {
        fetchStudent()
    }, [])

    const showStudent=async(id)=>{
        router.push("/student/"+id)
    }

    const deleteStudent = async (id) => {
        await fetch('http://localhost:8080/api/Student/' + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(() => router.reload(window.location.pathname));
    }

    return (

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto" style={{marginTop:"5rem", width:"30%"}}>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Student Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                           
                        </th>
                    </tr>
                </thead>
                <tbody>



                    {student.map(student => {
                        return (
                            <tr key={student.id} class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={()=>{showStudent(student.id)}}>
                                <td class="px-6 py-4">
                                    {student.name}
                                </td>

                                <td class="px-6 py-4 text-right">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => { deleteStudent(student.id) }}>Delete</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}

