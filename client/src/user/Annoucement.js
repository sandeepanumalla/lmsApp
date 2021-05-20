import { fromPairs } from 'lodash';
import React, { useState } from 'react';
import {Createform} from './createCourse'
import Base from '../core/Base';


const Annoucement = () => {
  const [values,setValues] = useState({
    title:"",
    description:"",
    videoUrl:""
  })


  const handleChange=name=>event=>{
    // console.log(event.target.name)
    const name = event.target.name;
    setValues({...values, [name] :event.target.value})
 }
 
  

    const Annoucementform =()=>{
        return(
        <div>
    
         <div style={{'display':'flex',"justifyContent":"center"}} className="row">
    
         <div style={{width:'25rem'}}>
         <form>
      
         <div className="form-group">
               <label className="text-dark">Title</label>
               <input
                 className="form-control"
                 onChange={handleChange()}
                 type="text"
                 name="title"
                //  value={""}
               />
               </div>
               <div className="form-group">
               <label className="text-dark">Description</label>
               <input
                 className="form-control"
                 onChange={handleChange()}
                 type="text"
                 name="description"
                 
               />
               <label className="text-dark">Video Url</label>
               <input
                 className="form-control"
                 onChange={handleChange()}
                 type="text"
                // value={coursecode}
                name="videoUrl"
              
               />
          </div>
          <button  className="btn btn-success"> submit</button>
             </form>
         </div>
         </div>
        
         </div>
        )
      }
    

    return (
        <div>
            <Base>
                {Annoucementform()}
            </Base>
        </div>
    )
}

export default Annoucement
