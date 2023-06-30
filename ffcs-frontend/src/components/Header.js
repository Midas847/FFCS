/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from 'react'
import { DataContext } from '../Context/ContextApi';
import { Link ,useLocation, useNavigate} from 'react-router-dom';
import { useAuthContext } from './useAuthContext';
import { useLogout } from './useLogout';

const Header = () => {
  let {pathname} = useLocation();
  const {user} = useAuthContext();
  const {logout} = useLogout();
  const navigate = useNavigate();
  const { first, setfirst} = useContext(DataContext);
    if(pathname==="/"){
      setfirst(true);
    }
    else if(pathname==="/timetable"){
      setfirst(false);
    }

    const signout = async () =>{
      logout();
      navigate("/signin")
    }

  return (
    <>
      <nav class=" dark:bg-gray-900 w-full top-0 left-0 border-b shadow-md border-gray-200 dark:border-gray-600"> 
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"> 
          <a href="https://flowbite.com/" class="flex items-center">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo"/> */}
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FFCS</span>
          </a>
          <div class="flex md:order-2 space-x-5">
              {user && <button type="button" class="text-white bg-[#256ec1] hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-[#256ec1] dark:focus:ring-blue-800" >{user?.id}</button>}
              <button type="button" class="text-white bg-[#256ec1] hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={signout}>Sign Out</button>
              <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </button>
          </div>
          <h1 className='font-bold ml-[8rem]'>Course Registration</h1>
        </div>
        <div className="flex justify-center mt-5 space-x-10">
          <Link to="/"> <h1 className={first?`border-b-4 pb-3 border-[#256ec1] text-[#256ec1] cursor-pointer`:`pb-3 cursor-pointer transition-all`} >Course Search</h1></Link>
          <Link to="/timetable"><h1 className={!first?`border-b-4 pb-3 border-[#256ec1] text-[#256ec1] cursor-pointer`:`pb-3 cursor-pointer transition-all`} >Course Timetable</h1></Link>
        </div>
      </nav>
    </>
  )
}

export default Header