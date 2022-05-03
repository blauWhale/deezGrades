import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Student() {

    const [gradeData, setGradeData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [averageData, setAverageData] = useState(0);
    const router = useRouter()
    const { sid } = router.query

    const fetchCourses = async (id) => {
        await fetch('http://localhost:8080/api/Grade/' + id)
            .then(response => response.json())
            .then(data => {
                setGradeData(data)
            }
            )
    }

    const fetchStudent = async (id) => {
        await fetch('http://localhost:8080/api/Student/' + id)
            .then(response => response.json())
            .then(data => {
                    setStudentData(data)
                }
            )
    }

    const fetchAverage = async (id) => {
        await fetch('http://localhost:8080/api/Grade/' + id)
            .then(response => response.json())
            .then(data => {
                let sum = 0.0
                let amount = 0
                data[0].grade.map((grade)=>{
                    sum += grade.grade
                    amount++
                })
                setAverageData(sum/amount);

                }
            )
    }

    useEffect(() => {
        fetchCourses(sid)
        fetchStudent(sid)
        fetchAverage(sid)
    }, [])


    return (

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2 mx-auto" style={{ marginTop: "5rem" }}>
            <table class="w-fit text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            {studentData.name}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        gradeData.map((data) => {
                            return (
                                <>
                                    <tr scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {data.course.name}
                                    </tr>
                                   {data && data.grade.map((grade)=>{
                                        return(<td class="px-2 py-4">
                                        {grade.grade}
                                    </td>)
                                   })}

                                </>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>
                <table className={"w-full text-sm text-right p-8"}><th>Average</th><td>{averageData}</td></table>
            </div>
        </div>

    )
}
