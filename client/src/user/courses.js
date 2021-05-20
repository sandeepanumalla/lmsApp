import React, { Component } from 'react';

import { api, BASE_URL, courseData, isAuthenticated, registered,registerHandlerFetch } from '../auth/helper/index';
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

//     registered=()=>{
//     console.log("rindfdfdfasfadfasdf",isAuthenticated().user._id);
//       return fetch(`/api/users/${isAuthenticated().user._id}/student/registered`,{
//         method: "GET", 
//     headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${isAuthenticated().token}`
//     },
//     body: JSON.stringify() 
//       }).then(data =>data.json()
//       )
//       .then(res => {console.log("dataaa",res)
//       this.setState({registered: res})
//     })
// }


// courseData = ()=>{
//     return fetch(`http://localhost:8000/api/users/student/courses`,{
//         method: "GET", 
//     headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${isAuthenticated().token}`
//     },
//     body: JSON.stringify() 
//       }).then(data =>data.json()
//       )
//       .then(res => {console.log("dataaa",res)
//       this.setState({coursess: res})
//     })
// } 
        async call(){
            
                try{
                    this.data =  await fetch(`${BASE_URL}/student/courses`,{
                            method: "GET", 
                            headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${isAuthenticated().token}`
                            },
                            body: JSON.stringify() 
                      })
                    
                        this.response = await this.data.json();

                        console.log(this.response);
                        this.setState({coursess:this.response});
                  
                }
                catch(err){
                    if(err.response && err.response.status === 404 ){
                            alert('Bad Request'+err)
                          }
                          else{
                            console.log('Logging the error',err);
                            alert('Unexpected error occurred.')
                          }
                      
                }
        }
        async callRegistered(){
            this.registeredCourses = await registered();
            this.setState({coursess:this.registeredCourses});
        }

    async componentDidMount() {
        
            this.call();
            this.callRegistered();
           

    }
        // getCourses = (event) =>{
        //     return fetch(`http://localhost:8080/api/${isAuthenticated().user._id}/student/registered`,
        //     {
        //         method:"GET",
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${isAuthenticated().token}`
        //           },
        //           body: JSON.stringify(event)
        //     })
        //     .then(result =>{
        //         console.log("success ->", result)
        //     })
        //     .catch(err => {
        //         console.log("err",err)
        //     })
        // }



   

    // registerCourse= (courseid)=>{
    //     return fetch(`/api/users/${isAuthenticated().user._id}/course/register/${courseid}`,
    //     {
    //         method:"POST",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${isAuthenticated().token}`
    //           },
    //           body: JSON.stringify()
    //     })
    //     .then(result =>{
    //         console.log("success")
            
            
    //     })
    //     .catch(err => {
    //         console.log("err",err)
    //     })
       
    // }

    registerHandler= async (courseid)=>{
        this.data = await registerHandlerFetch(courseid);
        console.log('status',this.data);
        if(this.data.status === 200){

           return this.props.history.push('/user/dashboard')
        }
        else{
            console.log("err in registering course");
        }

        // return api.post(`/${isAuthenticated().user._id}/course/register/${courseid}`)
        // .then((res,err)=>{
        //     if(err){
        //       console.log("err",err);
        //     }
        //     else{
        //         this.props.history.push('/user/dashboard')
        //     }
        // }
        //     )
        //     .catch((err) =>{
        //         if(err){
        //           console.log("err of catch",err)
        //         }
        //       })

          }


   
   render(){
       
    return (
        <Base description={`List of all available courses`} title={`Available courses`}>
        <div className="jumbotron bg-light text-dark text-center">
       
        <div class=" parent_container">
        {this.state.coursess.length !== 0 && this.state.coursess !== undefined && typeof this.state.coursess == 'object' ?
            this.state.coursess.map(title =>
            
            <div key={title._id} class=" colum"> 
           <div class="ui segment course">
           <h4 >{title.coursename}</h4>
           <h3 >{title.coursecode}</h3>
           <h5 >{`Instructor: ${title.instructor}`}</h5>
           { (title.students_enrolled.find(element => element  == isAuthenticated().user._id))  ? 
            
            <button onClick={()=>{this.registerHandler(title._id)}} disabled={true} className="btn btn-danger"> Already Registered</button>
            :
             
                <button onClick={()=>{this.registerHandler(title._id)}} className="btn btn-success">Register</button>
            
        }
           
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
/* { title.students_enrolled.find(element => element  == isAuthenticated().user._id)  && (
    <button onClick={()=>{this.registerHandler(title._id)}} className="btn btn-success">Already Registered</button>)
} */
/* {<button onClick={()=>{this.registerHandler(title._id)}} className="btn btn-success"> Registered</button>}
{ title.students_enrolled.find(element => element  == isAuthenticated().user._id)  && (
    <button onClick={()=>{this.registerHandler(title._id)}} className="btn btn-success">Already Registered</button>)
} */