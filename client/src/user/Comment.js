import { ClickAwayListener } from '@material-ui/core';
import React, { useState,useEffect } from 'react';

import { addReply } from '../auth/helper';


const Comment = ({ comment,setAnnoucements,announcements })=>{
    const [replyId,setReplyId] = useState();
    const [text,setText] = useState();

       const nestedComments = (comment.comments || []).map(comment => {
            
      return<Comment setAnnoucements={setAnnoucements} announcements={announcements} key={comment._id} comment={comment} type="child" />
    })

    const onClickReply =(id,id2)=>{
      
      setReplyId(id);
      console.log("clicked",id,id2);
    }

    const onCancel = ()=>{
      setText(null);
      setReplyId(null);
    }

    const handleChange = (event)=>{
      const {value} = event.target;
      setText(value.trim());
    }

    const onClickPost = async(id,announcementId)=>{
     try{ 
       console.log(id,announcementId);
       const response = await addReply(id,announcementId,text);
      const data = await response.json();
      console.log(data);
      const Index = announcements.findIndex(i => i._id == announcementId);
      const filter = announcements;
      filter.splice(Index,1,data);
      console.log("filtered",filter);
      console.log(setAnnoucements(filter));
      onCancel();
     }
      catch(err){
        alert('an error occured'+err);
      }
    }

   const reply = replyId === comment._id ?
                
                  <div className='row' style={{display:'flex'}}>
                    <div className="col col-md-9">
                        <input onChange={(e)=>handleChange(e)} type="text" class="form-control" placeholder="reply" required></input>
                        </div>
                        <div className="col ">
                        <button className="btn btn-secondary" style={{padding:"4px 2px"}} onClick={()=>onCancel()}>Cancel</button>
                         <button onClick={()=>onClickPost(comment._id,comment.annoucementId)} className="btn btn-success" style={{padding:"4px 2px"}}>Reply</button>
                        </div>
                  </div>
                :
                 
                   <button className='btn btn-primary' onClick={()=>onClickReply(comment._id,comment.annoucementId)} style={{marginLeft:"1rem",width:'5rem',padding:'0'}}>reply</button>
  
    return (
    <React.Fragment>
        <div  style={{ "marginLeft": "25px","marginTop": "10px",marginBottom:'1rem',color:'black',border:'none'}}>
           <div style={{display:'flex',flexDirection:'column'}}>
              <div style={{display:'flex'}}>
              <p ><span style={{color:'black',fontWeight:'bolder'}}>{comment.username+": "}</span>{comment.content}</p>  
              </div>
              <div>
                 {reply}   
              </div>
              
              {/*reply*/}   
           </div>

           <div>
           {nestedComments}
           </div>
           
        </div>
        
        </React.Fragment>
      
    )
  }
  export default Comment;