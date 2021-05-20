import React,{useEffect, useState} from 'react'
import { api, BASE_URL, fetchh, /* courses */ isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons'





const  AdminDashboard = ({history}) =>{
 
  const [values, setvalues] = useState({
    courses:[],
    modal: false,
    refresh: false

  })


  const onClickDelete = async (courseid) =>{
    const originalCourses = values.courses;
    const newCourses = values.courses.filter(m => m._id !== courseid._id)
    setvalues({courses: newCourses});

    try{
      const data = await fetch(`${BASE_URL}/${courseid._id}/delete`,{
        method: "DELETE", 
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuthenticated().token}`
        },
        body: JSON.stringify() 
      })
      const resp = await data.json()
      console.log(resp);
      
    }
    catch(err){
      alert("Something went wrong while droping course");
      setvalues({courses:originalCourses});
    }
  }
  
  useEffect(() =>{
    const call = async () =>{
      try{
        const data = await fetch(`${BASE_URL}/courses/enrolled/${isAuthenticated().user._id}`,{
        method: "GET",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuthenticated().token}`
        },
        body: JSON.stringify() 
      })
    
      const response = await data.json();
      setvalues({courses:response});
    }
    catch(err){
      alert("Something went wrong while fetching courses");
    }
      
    }
    setTimeout(()=>{
      call();
    },1)
  },[])
  
  const redirect =(courseid) => {
    history.push(`/${courseid}/assignment`)
  }

    const {user} = isAuthenticated();

    if(!Array.isArray(values.courses)){
      values.courses = [values.courses]
  }


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
          values.courses && values.courses.map(item => 
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
        
        </React.Fragment>
        
    )
}

export default AdminDashboard

