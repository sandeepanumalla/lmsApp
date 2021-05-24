
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import { promiseImpl } from 'ejs'
import React,{useState, useEffect} from 'react'
import ReactTooltip from 'react-tooltip'
import { api, courses, isAuthenticated,studentCourses } from '../auth/helper'
import Base from '../core/Base'
import http from '../Services/httpService'


api.interceptors.response.use(null,error=>{
  if(error){
    Promise.reject(error);
    console.log("an error occured",error);
  }
})

const  UserDashboard = ({history}) =>{
 const  [values,setvalues] = useState({
    courses:[]
  })

  const {user} = isAuthenticated()
  
  
  // const fetchh= async ()=>{
    
  //   const data = await fetch(`http://localhost:8000/api/users/${isAuthenticated().user._id}/student/registered`,{
  //     method: "GET",
  // headers: {
  // Accept: "application/json",
  // "Content-Type": "application/json",
  // Authorization: `Bearer ${isAuthenticated().token}`
  // },
  // body: JSON.stringify()
  //     })
  //     return data.json()
  //   }

    useEffect(() =>{
   
       const call = async()=>{
         try{
           const response = await studentCourses();
           const data = await response.json();
           setvalues({courses:data})
         
         }catch(err){
           alert("An error occurred while fetching courses",err);
         }
       }
        setTimeout(()=>{
          call();
        },5)

  },[])
 
 
  if(!Array.isArray(values.courses)){
    values.courses = [values.courses]
}

 

const redirect =(courseid) => {
   history.push(`/${courseid}/assignment`)
}

const onDeregister = async (course_id)=>{

 const originalCourses = values.courses;
 const newCourses = values.courses.filter(element => element._id !== course_id)
        setvalues({courses:newCourses})
    try{  
       const data = await api.post(`/${course_id}/course/deregister/${isAuthenticated().user._id}`)
       console.log(data.data)
        }
  catch(err){
    alert("Something went wrong while droping course");
    setvalues({courses:originalCourses});
  }
}  

    return (
        <Base title={`hello ${user.uname}, you are learning...`}  description={`List of courses you have enrolled`}>
        <div>
        <div style={{'height':'unset'}} className="jumbotron bg-light text-dark text-center">
     
        

      <div className=" parent_container">
      
     {
       values.courses.length===0 || values.courses !== undefined || values.courses !==null?
        values.courses.map(item => 
          <div key={item._id} className=" colum">
          <div className="eachcourse"> 
        <div  className="ui segment course">
      
        <h4 >{item.coursename}</h4>
        <h2 style={{cursor:"pointer"}} onClick={()=>{redirect(item._id)}} >{item.coursecode}</h2>
       <span data-tip data-for="deleteTip"   >
       <button onClick={()=>{onDeregister(item._id)}} className="btn btn-danger">Deregister</button>
       </span>
       
       </div>
       </div>
        </div>
        
        ):null
     }
     
     
     
         </div>
         <footer style={{position:"absolute",left:'0px',right:'0px'}} className="footer bg-light mt-auto py-3">
         <div style={{display:'flex',justifyContent:'center',gap:'2rem'}} className="container-fluid bg-success text-white text-center py-3">
          
           <button onClick={()=>history.push("/")} className="btn btn-warning btn-lg">About </button>
           <button className="btn btn-warning btn-lg">Contact </button>
         </div>
         <div className="container">
         
         </div>
       </footer>
        
       </div>
        </div>
          
          
          
        </Base>
    )
}

export default UserDashboard
