import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../Context/ContextApi'
import TableRow from './TableRow';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuthContext } from './useAuthContext';
import { useState } from 'react';



const Home = () => {
  const {courseData} = useContext(DataContext);
  // const {user} = useAuthContext();
  // console.log(courseData);
  const [search, setsearch] = useState("");

  const handleSearch = () =>{
    console.log(filteredData);
    // console.log(search);
  }

  var filteredData = courseData.filter((course)=>course.course_id===search);


  return (
    <>
    <Header />
    <Sidebar/>

      <div class="p-4 sm:ml-80">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className='flex space-x-5 '>
            {/* <div>
              <label for="course_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Name</label>
              <input type="text" id="course_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fundamentals of Computer Science" required/>
            </div> */}
            <div>
              <label for="course_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Code</label>
              <input type="text" id="course_code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CSE1001" required onChange={(e)=>setsearch(e.target.value)}/>
            </div>
            <div>
            <form class="flex items-center mt-7">   
              {/* <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
              </div> */}
               <button className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-[#256ec1] rounded-lg border border-[#256ec1] hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSearch}>
                  <svg aria-hidden="true" class="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search
              </button> 
            </form>
            </div>
          </div>
        </div>
        
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Course Code
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Course Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Credits
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Instructor
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Available Seats
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Slots
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {
                    (filteredData.length === 0)?
                    courseData.map((course,index)=>(
                      <TableRow key={index} id={course.course_id} name={course.name} credits={course.credit} faculty={course.registered_slot.name} 
                        seats={course.available_slots} slots={course.slot_ids} type={course.course_type}/>
                    )):filteredData.map((course,index)=>(
                      <TableRow key={index} id={course.course_id} name={course.name} credits={course.credit} faculty={course.registered_slot.name} 
                        seats={course.available_slots} slots={course.slot_ids} type={course.course_type}/>
                    ))
                  }
              </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default Home