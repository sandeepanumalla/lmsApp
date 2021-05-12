import React, { Component } from 'react';
import axios from 'axios';
import { api, isAuthenticated } from '../auth/helper';
import '../../node_modules/semantic-ui-css/semantic.min.css'


  
class EnrolledCourses extends Component  {
    state = {
        enrolled: []
    };
        
    componentDidMount() {
     
        console.log("enrolled runnign");
    //     api.get(`/courses/enrolled/${isAuthenticated().user._id}`).then(res => {
    //         console.log("courses dataaa ",res.data)
    //         this.setState({enrolled: res.data })
    //     });
    // }
    
    }
   
   render(){
    
    /* this.state.enrolled.foreach((item,array)=>{
        console.log("for each data," ,item)
    }) */

    if(!Array.isArray(this.state.enrolled)){
        this.state.enrolled = [this.state.enrolled]
    }
  /*  this.state.map((item=> `item sis ${item}`)); */

    return (
        <div className="jumbotron bg-light text-dark text-center">
       
        <div className=" ui three column grid">
       {
          this.state.enrolled.map(item => 
            <div class=" column"> 
          <div class="ui segment course">
          <h4 key={item._id}>{item.coursename}</h4>
          <h3 key={item._id}>{item.coursecode}</h3>

          </div>
          </div>
          )
       }
   
           </div>
   
   
   </div>
 
   
        
    )
}
}
export default EnrolledCourses
