import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import { AppContext } from './Context/ContextApi';
import TimeTable from './components/TimeTable';
import Login from './components/Login';
import { AuthContextProvider } from './Context/AuthContext';
import { useAuthContext } from './components/useAuthContext';


function App() {
  const {user} = useAuthContext();
  console.log(user);
  return (
    <>
     
          <Router>
            <Routes>
              <Route 
                path="/" 
                element={user ? <Home /> : <Navigate to="/signin" />} 
              />
              <Route 
                path="/timetable" 
                element={user ? <TimeTable/> : <Navigate to="/signin" />} 
                
              />
              <Route 
                path="/signin" 
                element={!user ? <Login /> : <Navigate to="/" />} 
              />
            </Routes>
          </Router>
    </>
  );
}

export default App;
