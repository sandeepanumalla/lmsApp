
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useState, useEffect} from 'react'
import ReactTooltip from 'react-tooltip'
import { api, courses, isAuthenticated } from '../auth/helper'
import Base from '../core/Base'



const  UserDashboard = ({history}) =>{
 const  [values,setvalues] = useState({
    courses:[]
  })

  const {user} = isAuthenticated()
  const fetchh=()=>{
    console.log("rindfdfdfasfadfasdf",isAuthenticated().user._id);
      return fetch(`http://localhost:8000/api/users/${isAuthenticated().user._id}/student/registered`,{
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
   /* api.get(`/${isAuthenticated().user._id}/student/registered`)
    .then(res => {
            console.log("courses dataaa ",res.data)
            setvalues({courses: res.data })
        }) */
    
        console.log("rinndf",isAuthenticated().user._id)  
        return fetchh()
       
 
  },[])
  if(!Array.isArray(values.courses)){
    values.courses = [values.courses]
}

 

const redirect =(courseid) => {
   history.push(`/${courseid}/assignment`)
}

const onDeregister =(course_id)=>{
  api.post(`/${course_id}/course/deregister/${isAuthenticated().user._id}`)
  .then(res => {
    console.log("success");
    const newCourse = values.courses.filter(element => element._id !== course_id)
    setvalues({courses:newCourse})
  })
}


    return (
        <Base title={`hello ${user.uname}, you are learning...`}>
        <div>
        <div className="jumbotron bg-light text-dark text-center">
     
        

      <div className=" parent_container">
     {
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
        )
     }
 
    
     
         </div>
 
        
       </div>
        </div>
          
          <footer style={{position:"absolute",left:'0px',right:'0px'}} className="footer bg-light mt-auto py-3">
          <div style={{display:'flex',justifyContent:'center',gap:'2rem'}} className="container-fluid bg-success text-white text-center py-3">
           
            <button onClick={()=>history.push("/")} className="btn btn-warning btn-lg">About </button>
            <button className="btn btn-warning btn-lg">Contact </button>
          </div>
          <div className="container">
          
          </div>
        </footer>
          
        </Base>
    )
}

export default UserDashboard
