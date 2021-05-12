
import React, { useState}  from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { courses, isAuthenticated } from '../auth/helper';

import Base from '../core/Base';

 
function CreateCourse() {
   const history = useHistory();
  const [values, setValues] = useState({
    coursecode:'',
    coursename:'',
    error: '',
    allfine:false,
    success:false,
    loading: false
  })

  const {allfine,coursecode, coursename, success, error,loading} = values;

  const handleChange = name => event=>{
    setValues({...values, error: false,  [name] : event.target.value})
  }

   
 const courses = course => {
  return fetch(`/api/users/course/createcourse/${isAuthenticated().user._id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify(course)
  })
    .then(response => {
      if(response.status  === 200){
        history.push("/admin/dashboard")
        return setValues({allfine:true})
      }
      console.log(response)
      return response
    }) 
    .then(data=>data.json())
    .catch(err => console.log(err));
 
};

  const onSubmit = (event)=>{
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    courses({coursename, coursecode})
    
    .then(data=>{
      console.log("data coiurses",data)
    })
    .catch(err=>console.log("error in creating course",err));
  }


  const createform =()=>{
    return(
    <div>

     <div style={{'display':'flex',"justifyContent":"center"}} className="row">

     <div style={{width:'25rem'}}>
     <form>
  
     <div className="form-group">
           <label className="text-dark">Course Name</label>
           <input
             className="form-control"
             onChange={handleChange("coursename")}
             type="text"
            value={coursename}
           />
           </div>
           <div className="form-group">
           <label className="text-dark">Course Code</label>
           <input
             className="form-control"
             onChange={handleChange("coursecode")}
             type="text"
            value={coursecode}
           />
      </div>
      <button onClick={onSubmit} className="btn btn-success"> submit</button>
         </form>
     </div>
     </div>
    
     </div>
    )
  }

   return (

    <Base description={``}title={<h3>Create course here</h3>}>
    {createform()}
   { 
  //    <footer style={{position:"absolute",left:'0px',right:'0px',bottom:'0px'}} className="footer bg-light mt-auto py-3">
  //   <div style={{display:'flex',justifyContent:'center',gap:'2rem'}} className="container-fluid bg-success text-white text-center py-3">
      
  //     <button onClick={()=>history.push("/")} className="btn btn-warning btn-lg">About </button>
  //     <button className="btn btn-warning btn-lg">Contact </button>
  //   </div>
  //   <div className="container">
    
  //   </div>
  // </footer>
}
    </Base>
    /* <p className="text-dark text-center">{JSON.stringify(values)}</p> */
    )
  }
  export default  CreateCourse;