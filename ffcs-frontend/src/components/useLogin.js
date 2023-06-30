import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)
    console.log(username, password);
    const response = await fetch('http://localhost:5000/student/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id: username, password })
    })
    // const response = await axios.post("http://localhost:5000/student/login",{
    //     id: username,
    //     password
    // })
    const json = await response.json()
    console.log(json);

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}