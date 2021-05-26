import React,{useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createAssignment, isAuthenticated } from '../auth/helper';
import Base from '../core/Base';


 
export default function Add() {
 
    const [values, setvalues] = useState({
        note:'',
        name:'',
        question:'',
        error:'',
        success:false

    })
    const history = useHistory();
    
    const {note,name, question} = values;
    const params = useParams();
        

        
  const handleChange = name => event=>{
    setvalues({...values, error: false,  [name] : event.target.value})
  }

  const postAssignment = async (item)=>{
    const data = await fetch(`/api/users/courses/new-assignment/${params.id}`,
    {method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify(item)})
    
    return data;

  }

  const createAssignment = async item =>{
      
    const data = await postAssignment(item);
    
  

  }
const onSubmit=(event)=>{
  event.preventDefault();
 
  postAssignment({note, name, question})
  .then( data=>{
    setvalues({
      ...values,
      coursecode:'',
      coursename:'',
      error:'',
      success: true
    })
    // console.log(data);
    if(data.status === 200){
      return history.goBack()
    }
  }
  ).catch(err=>{
    alert("error in creating assignment"+err)
    })
    
 
}

    const createform =()=>{
        return(
        <div>
           
          
        
         <div className="row">
      
         <div className="col-md-6 offset-sm-3 text-left">
         <form>
    
         <div className="form-group">
               <label className="text-dark" ><b>Assignment Name</b></label>
               <input
                 className="form-control"
                placeholder="Name"
                 type="text"
                 onChange={handleChange("name")}
                value={name}
               />
               </div>
               <div className="form-group">
               <label className="text-dark"><b>Note</b></label>
               <input
                 className="form-control"
                 placeholder="Note"
                 onChange={handleChange("note")}
                 type="text"
                 value={note}
                
               />
          </div>
          <div className="form-group">
               <label className="text-dark"><b>Question</b></label>
               <input
                 className="form-control"
                 placeholder="post question"
                 onChange={handleChange("question")}
                 type="text"
                value={question}
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
        <Base title={``}>
        {createform()}
       {
      //     <footer style={{position:"absolute",left:'0px',right:'0px',bottom:'0px'}} className="footer bg-light mt-auto py-3">
      //   <div style={{display:'flex',justifyContent:'center',gap:'2rem'}} className="container-fluid bg-success text-white text-center py-3">
          
      //     <button onClick={()=>history.push("/")} className="btn btn-warning btn-lg">About </button>
      //     <button className="btn btn-warning btn-lg">Contact </button>
      //   </div>
      //   <div className="container">
        
      //   </div>
      // </footer>
    }
        </Base>
        )
      }
      /* <p className="text-dark text-center">{JSON.stringify(values)}</p> */
