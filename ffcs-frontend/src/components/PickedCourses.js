import React, { useContext } from 'react'
import { DataContext } from '../Context/ContextApi';

const PickedCourses = () => {
    const {registeredCourses,courseData} = useContext(DataContext);
    console.log(registeredCourses);
    return (
    <div class="relative overflow-x-auto sm:rounded-lg mt-5 border-2 border-gray-200 border-dashed rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Slot
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Course Code
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Course Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Faculty
                    </th>
                    <th scope="col" class="px-1 py-3">
                        Credits
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    registeredCourses.map((course)=>(
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 flex py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {
                                    course.slot_ids.map((slot,index)=>{
                                        if(index===course.slot_ids.length-1) {
                                            return <p>{slot}</p>
                                        }
                                        else
                                        {
                                            return <p>{slot}/</p>
                                        }
                                    })
                                }
                            </th>
                            <td class="px-6 py-4">
                                {course.course_id}
                            </td>
                            <td class="px-6 py-4">
                                {course.course.name}
                            </td>
                            <td class="px-6 py-4">
                            {
                                course.faculty_id
                            }
                            </td>
                            <td class="px-6 py-4">
                                {course.course.credit}
                            </td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
    </div>

  )
}

export default PickedCourses