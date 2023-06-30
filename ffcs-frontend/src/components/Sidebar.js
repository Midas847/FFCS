import React, { useContext } from 'react'
import { DataContext } from '../Context/ContextApi'

const Sidebar = () => {
    const {registeredCourses, setdeleteCourse} = useContext(DataContext);
    let sum=0;
    for(let course of registeredCourses){
        // console.log(course.course.credit)
        sum += course.course.credit;
    }
  return (
    <>
        <aside id="default-sidebar" className="absolute left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-[#1b2c56] dark:bg-gray-800">
                <h1 className='text-lg text-white font-bold py-4 px-2'>Registered Courses</h1>
                <ul class="space-y-2 font-medium">
                    {
                        registeredCourses.map((course)=>(
                            <>
                            <li className='flex justify-between'>
                                <a href="/" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:text-black hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg aria-hidden="true" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 hover:text-black dark:group-hover:text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                    <span class="ml-3 ">{course.course_id} <span className="text-sm opacity-70">[{course.course_type}]</span></span>
                                </a>
                                <button type="button" class=" text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm px-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500" onClick={()=>{setdeleteCourse(course);window.location.reload();}}>
                                    <svg aria-hidden="true" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </li>
                            <hr/>
                            </>
                        ))
                    }
                </ul>
                <div>
                    <h1 className='text-md py-4 px-2 text-white'>Registered Credits: {sum}</h1>
                </div>
            </div>
        </aside>
    </>
  )
}

export default Sidebar