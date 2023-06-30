import axios from 'axios';
import React from 'react'
import { createContext, useEffect, useState } from "react";
import { useAuthContext } from '../components/useAuthContext';

export const DataContext = createContext();

export const AppContext = (props) => {
    const [first, setfirst] = useState(true);
    const [courseData, setcourseData] = useState([])
    const [registerCourses, setregisterCourses] = useState([]);
    const [registeredCourses, setregisteredCourses] = useState([]);
    const [deleteCourse, setdeleteCourse] = useState([]);
    const {user} = useAuthContext();

    useEffect(()=>{
      const deleteCourses = async () => {
        try {
          
          if(deleteCourse.course_id){
            axios.delete("http://localhost:5000/student/delete/slot", { data: { course_id: deleteCourse.course_id,
            course_type: deleteCourse.course_type,student_id: user.id }, headers: { "Authorization": 'Bearer '+user?.accessToken } });
          }
        } catch (error) {
          console.log(error);
        }
      };
      deleteCourses();
    },[deleteCourse,user]);

    useEffect(() => {
      console.log(user?.accessToken);
      const getRegisteredCourses = async () => {
        try {
          
          const res = await axios.get("http://localhost:5000/student",{headers: {'Authorization': 'Bearer '+user?.accessToken}});
          // console.log(res.data);
          const temp = res.data.filter((t)=>t.stud_id===user.id)
          // console.log(temp);
          setregisteredCourses(temp);
        } catch (error) {
          console.log(error);
        }
      };

      const getCourses = async () => {
        try {
          const res = await axios.get("http://localhost:5000/student/courses");
          setcourseData(res.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      getCourses();
      getRegisteredCourses();
    }, [user]);

    useEffect(() => {
      const register = async () => {
        try {
          console.log(registerCourses.id);
          if(registerCourses.id){
              const res = await axios.post("http://localhost:5000/student/register/slot",{
              course_id: registerCourses.id,
              course_type: registerCourses.type,
              faculty_id: registerCourses.faculty,
              slot_ids: registerCourses.slots,
              student_id: user.id,
            },{headers: {'Authorization': 'Bearer '+user?.accessToken}});
          }
        } catch (error) {
          console.log(error);
        }
      };
      register();
    }, [registerCourses,user])
    
    
    
    return (
        <DataContext.Provider
            value={{
                first,
                setfirst,
                courseData,
                setregisterCourses,
                registerCourses,
                registeredCourses,
                setdeleteCourse
            }}
        >
          {props.children}
        </DataContext.Provider>
      );
}
