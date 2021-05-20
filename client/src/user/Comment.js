import React from 'react';

const Comment = ({ comment })=>{
    const nestedComments = (comment.comments || []).map(comment => {
            
      return <Comment key={comment._id} comment={comment} type="child" />
    })
  
    return (
    <React.Fragment>
        <div className="ui segment" style={{ "marginTop": "10px",color:'black',border:'none'}}>
           <div style={{display:'flex'}}><p style={{color:'black',fontWeight:'bolder'}}>{comment.username}:  </p>{comment.content}</div>
           <div>
           {nestedComments}
           </div>
        </div>
       
        </React.Fragment>
      
    )
  }
  export default Comment;