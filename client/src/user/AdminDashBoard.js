
import React,{useEffect, useState} from 'react'
import { Redirect } from 'react-router-dom'
import { api, /* courses */ isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
/* import Courses   from './courses'
import CreateCourse from './createCourse' */
import EnrolledCourses from './enrolledCourses'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import { Button,Image, Header, Modal, Segment } from 'semantic-ui-react'


const  AdminDashboard = ({history}) =>{
 
  const [values, setvalues] = useState({
    courses:[],
    modal: false,
    refresh: false

  })


  const onClickDelete = (courseid) =>{
    return api.delete(`/${courseid._id}/delete`)
    .then((success)=>{
      if(success){
        console.log("success",success);
      }
        console.log("success");
        const newCourses = values.courses.filter(m => m._id !== courseid._id)
    setvalues({courses: newCourses})
    })
    .catch((err) =>{
      if(err){
        console.log("err",err)
      }
    })
    
    
  }
  const fetchh=()=>{
    console.log("rindfdfdfasfadfasdf",isAuthenticated().user._id);
      return fetch(`/api/users/courses/enrolled/${isAuthenticated().user._id}`,{
        method: "GET",
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify() 
      }).then(data =>data.json()
      )
      .then(res => {console.log("dataaa",res)
      setvalues({courses: res })
    })

    /* return api.get(`/${isAuthenticated().user._id}/student/registered`)
    .then(res => {
            console.log("courses dataaa ",res.data)
            setvalues({courses: res.data })
        })
      } */
    }
  
  useEffect(() =>{
    // api.get(`/courses/enrolled/${isAuthenticated().user._id}`)
    // .then(res => {
    //         console.log("courses dataaa ",res.data)
    //         setvalues({courses: res.data })
    //     })
    // ;
    return fetchh();
  },[])
  
  const redirect =(courseid) => {
    history.push(`/${courseid}/assignment`)
  }
  
  
    const {user} = isAuthenticated();

    if(!Array.isArray(values.courses)){
      values.courses = [values.courses]
  }

 /* 
  console.log(values.courses[1]) */
    return (
      <React.Fragment>
        <Base description={``} title={`hello ${user.uname}, you are teaching...`} >
          <div className="d-flex justify-content-center">
            <button onClick={() => {history.push('/createcourse')}} style={{borderRadius:"10px"}}  
            className=" ui teal button ">Enroll a Course</button>
          </div>
          
          <div>
          <div style={{position:'absolute',left:'0',right:'0'}} className="jumbotron bg-light text-dark text-center">
       
          

        <div className="parent_container">
       {
          values.courses.map(item => 
            <div key={item._id} className=" colum">
            <div className="eachcourse"> 
          <div  className="ui segment course">
        
          <h4 >{item.coursename}</h4>
          <h2 style={{cursor:"pointer"}} onClick={()=>{redirect(item._id)}} >{item.coursecode}</h2>
         <span data-tip data-for="deleteTip" style={{cursor:'pointer'}}  onClick={()=>{onClickDelete(item)}}>
         <FontAwesomeIcon icon={faTrash} color="#ff4d4d" size="2x" style={{hover:{color:"black"}}} />
         </span>
        
         </div>
         </div>
          </div>
          )
       }
   
      
       
           </div>
   
          
   </div>
           
          </div>
         
          
         {
      //       <footer style={{position:"absolute",left:'0px',right:'0px'}} className="footer bg-light mt-auto py-3">
      //       <div style={{display:'flex',justifyContent:'center',gap:'2rem'}} className="container-fluid bg-success text-white text-center py-3">
      //         <h4></h4>
      //         <button onClick={()=>history.push("/")} className="btn btn-warning btn-lg">About </button>
      //         <button className="btn btn-warning btn-lg">Contact </button>
      //       </div>
      //       <div className="container">
            
      //       </div>
      // </footer>
    }
        </Base>
        <div>
        
        </div>
        </React.Fragment>
        
    )
}

export default AdminDashboard

