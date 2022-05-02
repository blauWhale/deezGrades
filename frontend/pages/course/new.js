import React, { useRef,useState } from 'react'
import Swal from 'sweetalert2'

export default function New() {
    const nameRef = useRef("")
    const [ check, setCheck]  = useState(0)

    const handleSubmit = async () => {
        await fetch('http://localhost:8080/api/Course', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": nameRef.current.value,
                "bms": check ? 0 : 1
            })
        })
            .then(response => response.json())
            .then(() => Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
            ));
    }
    return (

        <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mx-auto" style={{marginTop:"5rem"}}>
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New Course</h5>
            </a>
            <form>
                <div className="mb-6">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Course name</label>
                    <input type="name" ref={nameRef} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Course Name" />
                </div>

                <div class="flex items-center mb-4">
                    <input id="checkbox-2" type="checkbox" onChange={e => {setCheck(e.target.checked)}} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">BMS</label>
                </div>
                <button type="button" onClick={() => { handleSubmit() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>


    )
}
