import React, { useState } from 'react'
import { useLogin } from './useLogin';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const {login, error, isLoading} = useLogin()
  const navigate = useNavigate();

  const handleClick = async (e) =>{
    e.preventDefault();
    // login({username,password});
    // console.log({username, password});
    await login(username, password);
    navigate("/");
  }

  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                  </h1>
                  <form class="space-y-4 md:space-y-6" action="#">
                      <div>
                          <label for="studId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Id</label>
                          <input type="id" name="studId" id="studId" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="20BCE****" required="" onChange={(e)=>{setusername(e.target.value)}}/>
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=>{setpassword(e.target.value)}}/>
                      </div>
                      <button disabled={isLoading} type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleClick}>Sign in</button>
                      {error && <div className="error">{error}</div>}
                  </form>
              </div>
          </div>
      </div>
    </section>
    </>
  )
}

export default Login