import React,{useState, useEffect, Component, Fragment} from 'react';
import Base from '../core/Base';
import '../../node_modules/semantic-ui-css/semantic.min.css'
import { addAnnoucementAPI, addComment, api, BASE_URL,deleteAnnoucementAPI, 
  fetchAssignment, submitAssignment ,getAnnoucementAPI, getOneAnnoucement, isAuthenticated, EditAnnouncement } from '../auth/helper';
import { render } from '@testing-library/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faTrash, faEdit,faFolder,faDumpster } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip';
import { Redirect } from 'react-router-dom';
import { TextArea } from 'semantic-ui-react';
import {makeStyles} from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import Youtube from 'react-youtube';
import getYoutubeId from 'get-youtube-id';
import { filter } from 'lodash';
import Comment from './Comment';


export default class Assignments extends Component {
    
    
    state={
      Comment:"",
        assignment:[],
        question:"",
        solution:"",
        solutionArray:[],
        error:"",
        user:'',
        e:'',
        deleteError:"",
        deleteMessage:"",
        assignment_id:'',
        success: false,
        clicked:false,
        submitted:'',
        title:"",
        video_url:"",
        description:"",
        annoucements:[],
        EditAnnouncement:""
    }

    clickHandler = (assignment_id) =>{
        console.log("you are awesome!"  )
       return this.props.history.push(`/submissions/${assignment_id}`)
    }

  async componentDidMount(){
    try{

      const data = await fetch(`${BASE_URL}/courses/${this.props.match.params.id}/assignment`,{
        method:'GET',
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuthenticated().token}`
        },
        body: JSON.stringify()
      })
      const response = await data.json()
      console.log(response)
      this.setState({assignment:response});
      const annoucements = await getAnnoucementAPI(this.props.match.params.id);
      const annoucements_data = await annoucements.json();
      this.setState({annoucements:annoucements_data});
      
    }
    catch(err){
      if(err.response && err.response.status === 404){
        alert(`Something went wrong`)
      }
      else{
        alert(`Unexpected error ocurred`+err)
      }
    }
    
}
   

   addHandler = async () =>{
    this.props.history.push(`/${this.props.match.params.id}/assignment/new`)

  }

  click=(item)=>{
      this.setState({clicked:true,question:item.question,assignment_id:item._id})
      console.log("items in item",item)

  }

  handleChange=name=>event=>{
      this.setState({error:false,[name]:event.target.value.trim()})
  }
   
   submitAnswer = async item =>{
    try{
        const response = await submitAssignment(item,this.state.assignment_id);
        const data = await response.json();
        

      }
      catch(err){
        alert('an error occurred'+err);
      }
  }
  

  onSubmit=(event)=>{
    event.preventDefault();
    this.setState({...this.state, error:false})
    const value = this.state.solution;
    console.log("value ",value)
    this.submitAnswer({value})
    .then( data=>{
        this.setState({ ...this.state,
        solution:"",
        success: true
        })
        console.log("data",data)
      })
    .catch(err => console.log(err))
  }

 deleteAssignment(){
   api.delete(`/delete/:asignmentId`)
 }

  onDelete= async (i)=>{
    const originalAssignments = this.state.assignment;

    const filter = this.state.assignment.filter(e => e._id !== i._id)
          
          this.setState({assignment:filter})
    try{
      const data = await api.delete(`/delete/${i._id}`)
    }
    catch(err){
      alert('Unexpected error occured'+err);
      this.setState({assignment:originalAssignments});
    }

  }

  addAnnoucement = ()=>{
    this.props.history.push(`/new-annoucement`)
  }

  postAnnoucement = async ()=>{
    const course_id = this.props.match.params.id;
    const {title,description,video_url} = this.state;
    const body = {title,description,video_url}
    
    try{
      const response = await addAnnoucementAPI(course_id, body);
      if(response.status === 422 ){
        alert(`fields cannot be empty`);
      }
      else{
        const data= await response.json();
        console.log(data);
        this.setState({...this.state,title:"",description:"",video_url:""})
      }
      // console.log(response);
    }catch(err){
      alert("an error occurred"+err)
    }
  }

  onDeleteAnnoucement = async(id) =>{
    const originalAssignments  = this.state.annoucements;
    const filtered = this.state.annoucements.filter(item => item._id !== id);
    this.setState({annoucements:filtered});
    try{
      const response = await deleteAnnoucementAPI(id);
      const data = await response.json();
     
    }
    catch(err){
      alert(`an unexpected error occured`+err);
      this.setState({annoucements:originalAssignments});
    }
  }

  onClickEdit = async(id)=>{
    // this.setState({EditAnnouncement:true})

    // const body = {title,description,video_url}
    // const response = await EditAnnouncement(id, body);
    // const data = await response.json();
    // console.log(data);
  }

  onClickComment = async(annoucementId)=>{
    const originalComments = this.state.annoucements;
    try{
      const response = await addComment(annoucementId,this.state.Comment);
      if(response.status < 400){
        const data  = await response.json();
      console.log(data);
    
      const Index = this.state.annoucements.findIndex(annoucement => annoucement._id === annoucementId);
      const filter = this.state.annoucements;
        filter.splice(Index,1,data);
        this.setState({annoucements:filter});
      }
      else{
        if(response.status === 422){
          alert("fields cannot be empty");
        }
      }
      
    }
    catch(err){
      alert("error occurrred"+err);
      this.setState({annoucements:originalComments});
    }
  }

  handleState = (value)=>{
    // console.log("handleStateChange",value);
    this.setState({assignment:value});
  }

render(){
  const opts = {
    height: '390px',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
};
    return (
        <Base  title={` `} description={``}>
        <div id="form" className="ui grid container" style={{display:'flex',justifyContent:'flex-start'}} >
        <div className="some_colum" style={{maxWidth:"30rem"}}>
        
          <div className="ui container" style={{border:"2px solid black",borderRadius:"12px",overflow:"hidden"}}>
          <div style={{display:"flex", justifyContent:"space-around",allignItems:"center"}}>
          <h1 className="text-dark">Assignments</h1>
          {isAuthenticated() && isAuthenticated().user.role === "Teacher" && (
            <div data-tip data-for="add-tip" style={{padding:"5px"}}>
            <button  className="text-dark" onClick={this.addHandler}>+</button>
            <ReactTooltip id="add-tip" place="top" >Add Assignment</ReactTooltip>
            </div>
            )
            
          }
          </div>

         
           {this.state.assignment.length === 0 || this.state.assignment.length === undefined?<h1 style={{color:'black',textAlign:'center'}}>{'No assignment assigned'}</h1>:
            this.state.assignment &&  this.state.assignment.map(item =>{
               return <div key={item._id} className="ui segment "  > 
               <div className="d-flex justify-content-center" style={{padding:"17px"}}>
               <h3 className="text-dark" key={item._id}>{item.name} 
               </h3>
               </div>
               <div className="d-flex justify-content-center" style={{padding:"4px"}}>
               <h4 className="text-dark" key={item._id}>{item.note}</h4>
               </div>
               
               {isAuthenticated() && isAuthenticated().user.role === "Teacher" ?    ( <Fragment> 
                <div className="d-flex justify-content-center" style={{padding:"4px"}} >
                <span style={{padding:"10px"}} onClick={()=>this.onDelete(item)} data-tip data-for="deleteTip"  >
         <FontAwesomeIcon icon={faTrash} color="#ff4d4d" size="2x" style={{cursor:'pointer',hover:{color:"black"}}} />
         </span>
        
      
         <span style={{padding:"10px"}} data-tip data-for="viewTip" onClick={()=>{this.clickHandler(item._id)}} >
         <FontAwesomeIcon icon={faFolder} color="green" size="2x" style={{cursor:'pointer',hover:{color:"black"}}} />
         </span>
         <ReactTooltip id="deleteTip"  place="top" >Delete Assignment </ReactTooltip>
         <ReactTooltip id="EditTip" place="top">Edit Annoucement</ReactTooltip>
         <ReactTooltip id="viewTip" place="top" >View Submissions </ReactTooltip>
        
         </div>
         </Fragment>
         )
         :
         [(<Fragment>
         {
          (item.solutions.find(elements => elements.student == isAuthenticated().user.uname))
           ?
           (
             <Fragment> 
             <div className="d-flex justify-content-center">
             <button onClick={()=>this.click(item)} disabled={true} className="ui red button"> submitted</button>
             </div>
            {(this.state.e = item.solutions.find(element => element.results >= 0 ))
              ?
              (<Fragment>
                {
                  (item.solutions.find(element => element.results === null))
                  ?
                  (<div className="d-flex justify-content-center" style={{padding:"13px"}}>
                    <h4 className="text-dark">grade pending</h4>
                    </div>):
                  (<div className="d-flex justify-content-center" style={{padding:"13px"}} >
                  <h4 className="text-dark"> graded: {JSON.stringify(this.state.e.results)}</h4>
                  </div>)
                }
              </Fragment>
              ):
              <div className="d-flex justify-content-center" style={{padding:"13px"}} >
              <h4 className="text-dark"> pending</h4>
              </div>
           }

           </Fragment>
           
         )
           
           :
           <div className="d-flex justify-content-center" style={{padding:"13px"}} >
           [<button onClick={()=>this.click(item)} className="ui teal button">Start</button>]
              </div>
            
            /* (item.solutions.find(element=>element.results ===  "9"))?
            (<button onClick={()=>this.click(item)} disabled={true} className="ui red button">Aeady submitted</button>):
            (<button onClick={()=>this.click(item)} className="ui teal button">Start</button>) */

            }
       
          </Fragment>
               
         )]
        }

            </div>
  
        })
   
    }
    
    </div>
    </div>
 
   <div className="some_colum" style={{maxWidth:"50rem"}}>
   {
     this.state.clicked && isAuthenticated().user.role === "Student" &&
        <div style={{marginBottom:"1rem"}} className="ten wide column">
            <div className="ui container" style={{border:"2px solid black",borderRadius:"12px",overflow:"hidden"}}>
            <div style={{display:"flex", justifyContent:"space-around",allignItems:"center"}}>
            <h1 className="text-dark">Answer</h1>
            </div>
            <div>
            <form className="tiny ui form">
            <div className="field">
            <div className="ui segment">
            <h1 className="text-dark"> {this.state.question}</h1>
            <textarea  type="text" onChange={this.handleChange("solution")} placeholder="solution" rows="2"></textarea>
            <input type="submit" onClick={this.onSubmit} className="ui teal button"></input>
            </div>
            </div>
        
            </form>
            </div>
            
            </div>
             </div>
   }

   

        
          <div className="ui container" style={{border:"2px solid black",borderRadius:"12px",overflow:"hidden"}}>
          <div style={{display:"flex", flexDirection:"column",justifyContent:"space-around",allignItems:"center"}}>
          <h1 style={{textAlign:'center'}} className="text-dark">Announcements</h1>
          <div>
          {isAuthenticated() && isAuthenticated().user.role === "Teacher" && (
            
         <React.Fragment>
            <div>
            <div  className="row">
             <div className="col">
             <input  type="text" onChange={this.handleChange("title")} class="form-control" placeholder="Title" required></input>
             </div>
             <div className="col">
             <input  type="text"  onChange={this.handleChange("video_url")} class="form-control" placeholder="Video Url" required></input>
             </div>
            </div>
            <div className="row">
            <div className="col">
             <TextArea  type="text"  onChange={this.handleChange("description")} class="form-control" placeholder="Description" required></TextArea>
             </div>
            </div>
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
            <button onClick={()=>this.postAnnoucement()} className="btn btn-success">Post New Annoucement</button>
            </div>
            )
            
            </React.Fragment>) }
            
            <div style={{marginTop:'1rem'}} >
             {
              this.state.annoucements && this.state.annoucements.map(item =>{
                let id = getYoutubeId(item.video_url);
                let date = new Date(item.createdAt);
                let month = date.getMonth()+1;
                return <React.Fragment>
                        <div key={item._id} className="ui segment">
                        <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                        <h6 style={{'color':'black','fontSize':'2rem','fontWeight':'bold',textAlign:'center'}}>{item.title}</h6>
                        <p style={{color:'black'}}>{item.description}</p>
                        <p style={{color:'black'}}>{"posted on "+date.getDate()+"/"+month+"/"+date.getFullYear()}</p>
                        </div>
                      
                        <Youtube opts={opts} videoId={id}></Youtube>
                        {isAuthenticated() && isAuthenticated().user.role === "Teacher" && (
                          <div style={{width:"100%",display:'flex',justifyContent:'center'}}>
                          <span style={{padding:"10px",alignSelf:'center',cursor:'pointer'}} data-tip data-for="EditTip"  >
                          <a href="#form">
                          <FontAwesomeIcon onClick={()=>{this.onClickEdit(item._id)}} icon={faEdit} color="blue" size="2x" style={{hover:{color:"black"}}} />
                          </a>
                          </span>
                          <ReactTooltip id="EditTip" place="top">Edit Annoucement</ReactTooltip>
                          <ReactTooltip id="DeleteTip" place="top">Delete Annoucement</ReactTooltip>
                          <span style={{padding:"10px",alignSelf:'center',cursor:'pointer',marginLeft:"1rem",cursor:'pointer'}} data-tip data-for="DeleteTip">
                          <FontAwesomeIcon onClick={()=>{this.onDeleteAnnoucement(item._id)}} icon={faTrash} color="#ff6600" size="2x" style={{hover:{color:'#ff6600'}}}/>
                          </span>
                          </div>
                        )}
                        <div>
                        {
                          item.comments.length >0 && item.comments !== undefined &&
                          item.comments.map((comment) => {
                            return (
                              <React.Fragment>
                                <Comment announcements={this.state.annoucements} setAnnoucements={this.handleState} key={comment._id} comment={comment} />
                              </React.Fragment>
                            )
                          })
                       }
                       <div className="row">
                        <div className="col col-md-9">
                        <input  type="text" onChange={this.handleChange("Comment")} class="form-control" placeholder="Comment" required></input>
                        </div>
                        <div className="col ">
                         <button onClick={()=>{this.onClickComment(item._id)}} className="btn btn-success" style={{padding:"4px 2px"}}>Comment</button>
                        </div>
                       </div>
                       </div>
                        </div>
                         
                </React.Fragment>
              })
             }
            </div>

          </div>
    </div>
    </div>
    </div>

    {this.state.clicked ? <div className="ten wide column">
        <div className="ui container" style={{border:"2px solid black",borderRadius:"12px",overflow:"hidden"}}>
        <div style={{display:"flex", justifyContent:"space-around",allignItems:"center"}}>
        <h1 className="text-dark">Question</h1>
        </div>
        <div>
        <form className="tiny ui form">
        <div className="field">
        <div className="ui segment">
        <h1 className="text-dark"> {this.state.question}</h1>
        <textarea  type="text" onChange={this.handleChange("solution")} placeholder="solution" rows="2"></textarea>
        <input type="submit" onClick={this.onSubmit} className="ui teal button"></input>
        </div>
        </div>
        
        </form>
        
        </div>
        
        </div>
        </div>
        : <h1></h1>

}


    </div>
        {
          
    //       <footer style={{position:"absolute",left:'0px',right:'0px'}} className="footer bg-light mt-auto py-3">
    //     <div style={{display:'flex',justifyContent:'center',gap:'2rem'}} className="container-fluid bg-success text-white text-center py-3">
    //       <h4></h4>
    //       <button onClick={()=>this.props.history.push("/")} className="btn btn-warning btn-lg">About </button>
    //       <button className="btn btn-warning btn-lg">Contact </button>
    //     </div>
    //     <div className="container">
        
    //     </div>
    // </footer>
  }
    
    </Base>
    
    )
}
}


{
  // <div className="ten wide column">
  //       <div className="ui container" style={{border:"2px solid black",borderRadius:"12px",overflow:"hidden"}}>
  //       <div style={{display:"flex", justifyContent:"space-around",allignItems:"center"}}>
  //       <h1 className="text-dark">Annoucements</h1>
  //       </div>
  //       <div>
  //       <form className="tiny ui form">
  //       <div className="field">
  //       <div className="ui segment">
  //       <h1 className="text-dark"> {this.state.question}</h1>
  //       <textarea  type="text" onChange={this.handleChange("solution")} placeholder="solution" rows="2"></textarea>
  //       <input type="submit" onClick={this.onSubmit} className="ui teal button"></input>
  //       </div>
  //       </div>
     
  //       </form>
  //       </div>
        
  //       </div>
  //       </div>
}