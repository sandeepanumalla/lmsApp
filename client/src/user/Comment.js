import { ClickAwayListener } from '@material-ui/core';
import React, { useState,useEffect } from 'react';

import { addReply, deleteReplies,deleteCommentAPI, isAuthenticated } from '../auth/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faTrash, faEdit,faFolder,faDumpster } from '@fortawesome/free-solid-svg-icons'

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
    const deleteComment = async (data)=>{
      try{
        if(data.type == "comment"){
          const response =  await deleteCommentAPI(data.annoucementId,data._id);
          const result  = await response.json();
         
          alert(`comment deleted successfully`);
          const Index = announcements.findIndex(i => i._id == data.annoucementId);
          const filter = announcements;
          filter.splice(Index,1,result);
          setAnnoucements(filter);
          console.log(result);
          console.log("its a comment")
        }
        else if(data.type == "reply"){
          const response  = await deleteReplies(data.annoucementId,data.parentId,data._id);
          const result = await response.json();
          alert(`deleted successfully`);
          const Index = announcements.findIndex(i => i._id == data.annoucementId);
          const filter = announcements;
          filter.splice(Index,1,result);
          setAnnoucements(filter);
          setAnnoucements(result);
          console.log("its reply",result)
        }
      }catch(err){
        alert('error deleting comment'+err);
      }

    }

   const reply = replyId === comment._id ?
                  <div className='row' style={{display:'flex', marginTop:'1rem'}}>
                    <div className="col col-md-9">
                        <input onChange={(e)=>handleChange(e)} type="text" class="form-control" placeholder="reply" required></input>
                        </div>
                        <div className="col ">
                         <button onClick={()=>onClickPost(comment._id,comment.annoucementId)} className="btn btn-success" style={{padding:"4px 2px",marginRight:"1rem"}}>Reply</button>
                         <button className="btn btn-secondary" style={{padding:"4px 2px"}} onClick={()=>onCancel()}>Cancel</button>
                        </div>
                  </div>
                :
                  <div>
                   <button  className='btn btn-primary'  onClick={()=>onClickReply(comment._id,comment.annoucementId)} style={{marginLeft:"1rem",width:'5rem',padding:'0'}}>reply</button>
                   
                   {/*<FontAwesomeIcon icon={faTrash} color="red" size="2x" style={{hover:{color:"black"}}} />*/}
                  </div>

  
    return (
    <React.Fragment>
        <div  style={{ "marginLeft": "25px","marginTop": "10px",marginBottom:'1rem',color:'black',border:'none'}}>
           <div style={{display:'flex',flexDirection:'column'}}>
              <div style={{display:'flex', border:'1px solid grey',borderRadius:'5px',paddingTop:'.5rem',paddingBottom:'.5rem'}}>
              <p style={{width:'80%'}} ><span style={{color:'black',fontWeight:'bolder'}}>{comment.username+": "}</span>{comment.content}</p>
              {
                comment.user_id == isAuthenticated().user._id ||
                announcements.find(item => item.instructor_id == isAuthenticated().user._id)
                ?
                <button className= 'btn btn-danger' onClick={()=>deleteComment(comment)} style={{marginLeft:"1rem",width:'5rem',padding:'0'}} >Delete</button> 
                : null
              } 
              
              </div>
              <div>
                 {reply}   
              </div>
           </div>

           <div>
           {nestedComments}
           </div>
           
        </div>
        
        </React.Fragment>
      
    )
  }
  export default Comment;