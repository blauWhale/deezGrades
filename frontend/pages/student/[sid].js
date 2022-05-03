import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Student() {

    const [data, setData] = useState([]);
    const router = useRouter()
    const { sid } = router.query

    const fetchCourses = async (id) => {
        await fetch('http://localhost:8080/api/Grade/' + id)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setData(data)
            }
            )
    }

    useEffect(() => {
        fetchCourses(sid)
    }, [])


    return (

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2 mx-auto" style={{ marginTop: "5rem" }}>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Student Name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((data) => {
                            return (
                                <>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {data.course.name}
                                    </th>
                                   {data && data.grade.map((grade)=>{

                                        return(<td class="px-6 py-4">
                                        {grade.grade}
                                    </td>)
                                   })}
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

    )
}
