import React, { Component } from 'react';

import { api, BASE_URL, courseData, isAuthenticated, registered,registerHandlerFetch, studentCourses } from '../auth/helper/index';
import '../../node_modules/semantic-ui-css/semantic.min.css'
import Base from '../core/Base';
import { Redirect, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Axios from 'axios';
 

  
class Courses extends Component  {
     
    state = {
        coursess: [],
        registered:[],

    };
   details =  isAuthenticated().user._id
//    await fetch(`/api/users/student/courses`,{
//     method: "GET",   
//     headers: { 
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${isAuthenticated().token}`
//     },
//     body: JSON.stringify() 
// })

    async componentDidMount() {
        const data =  await fetch(`/api/users/student/courses`,{
                method: "GET",   
                headers: { 
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
                },
                body: JSON.stringify() 
            });
      const response  = await data.json()

    //   console.log(response);
    //   console.log("running check??");
      this.setState({coursess:response});
      const registeredCourses = await registered();
      this.setState({registered:registeredCourses});
    }
      

    registerHandler= async (courseid)=>{
        const data = await registerHandlerFetch(courseid);
        // console.log('status',this.data);
        if(data.status === 200){

           return this.props.history.push('/user/dashboard')
        }
        else{
            alert( `err in registering course`)
            // console.log("err in registering course");
        }

    }


   
   render(){
       
    return (
        <Base description={`List of all available courses`} title={`Available courses`}>
        <div style={{height:'unset'}} className="jumbotron bg-light text-dark text-center">
       
        <div class=" parent_container">
        {this.state.coursess.length !== 0 && this.state.coursess !== undefined && typeof this.state.coursess == 'object' ?
            this.state.coursess.map(title =>
            
            <div key={title._id} class=" colum"> 
            
           <div className="eachcourse">
           <div className="ui segment course">
           <h4 >{title.coursename}</h4>
           <h3 >{title.coursecode}</h3>
           <h5 >{`Instructor: ${title.instructor}`}</h5>
           { (title.students_enrolled.find(element => element  == isAuthenticated().user._id))  ? 
            
            <button onClick={()=>{this.registerHandler(title._id)}} disabled={true} className="btn btn-danger"> Already Registered</button>
            :
             
                <button onClick={()=>{this.registerHandler(title._id)}} className="btn btn-success">Register</button>
            
        }
           
           </div>
           </div>
           </div>):null
           
        }
        
        </div>
        
      
        </div>
{
    //     <footer style={{position:"absolute",left:'0px',right:'0px'}} className="footer bg-light mt-auto py-3">
    //     <div style={{display:'flex',justifyContent:'center',gap:'2rem'}} className="container-fluid bg-success text-white text-center py-3">
         
    //       <button onClick={()=>this.props.history.push("/")} className="btn btn-warning btn-lg">About </button>
    //       <button className="btn btn-warning btn-lg">Contact </button>
    //     </div>
    //     <div className="container">
        
    //     </div>
    //   </footer>
}
        </Base>
        
        
        )
    }
}

export default Courses
