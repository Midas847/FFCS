import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../Context/ContextApi'



const TableRow = ({id,name,credits,faculty,seats,slots,type}) => {
    const {setregisterCourses,registeredCourses} = useContext(DataContext);

    const register = () => {
        setregisterCourses({id,type,faculty,slots,credits});
        window.location.reload();
    }

    return (
        <>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 font-[400]">
                <th scope="row" class="text-[#256ec1] px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                    {id}
                </th>
                <td class="px-6 py-4">
                    {name}
                </td>
                <td class="flex px-6 py-4 justify-center">
                    {credits}
                </td>
                <td class="px-6 py-4">
                    {faculty}
                </td>
                <td class="px-12 py-4 text-[#04ac6e]">
                    {seats}
                </td>
                <td class="px-6 py-4 flex">
                    {
                        slots.map((slot,index) => {
                            if(index===slots.length-1) {
                                return <p>{slot}</p>
                            }
                            else
                            {
                                return <p>{slot}/</p>
                            }
                        })
                    }
                </td>
                    <td class="px-6 py-4">
                        {
                            registeredCourses.find(course=>course.course_id===id)?(<><button class="font-medium text-[#256ec1] opacity-50 dark:[#256ec1] hover:underline" onClick={register}>Registered</button></>):(<><button class="font-medium text-[#256ec1] dark:text-[#256ec1] hover:underline" onClick={register}>Register</button></>)
                        }
                    </td>
                </tr>
        </>
  )
}

export default TableRow