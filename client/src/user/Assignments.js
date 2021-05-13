import React,{useState, useEffect, Component, Fragment} from 'react';
import Base from '../core/Base';
import '../../node_modules/semantic-ui-css/semantic.min.css'
import { api, fetchAssignment, isAuthenticated } from '../auth/helper';
import { render } from '@testing-library/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faTrash, faEdit,faFolder } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip';
import { Redirect } from 'react-router-dom';


export default class Assignments extends Component {
    
    
    state={
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
        submitted:''
    }

    

    clickHandler = (assignment_id) =>{
        console.log("you are awesome!"  )
       return this.props.history.push(`/submissions/${assignment_id}`)
        
    }

    async  call(){
      this.data = await fetchAssignment(this.props.match.params.id);
      this.setState({assignment:this.data})
    }

   componentDidMount(){
    setTimeout(()=>{
      this.call();
    },5)
}
   

  addHandler = () =>{
    this.props.history.push(`/${this.props.match.params.id}/assignment/new`)

  }

  click=(item)=>{
      this.setState({clicked:true,question:item.question,assignment_id:item._id})
      console.log("items in item",item)

  }

  handleChange=name=>event=>{
      this.setState({error:false,[name]:event.target.value})
  }
   
   submitAnswer = item =>{
    console.log(" df",this.state.assignment_id)
    console.log(" dffffff",isAuthenticated().user._id)
    return  fetch(`http://localhost:8000/api/users/${isAuthenticated().user._id}/courses/${this.state.assignment_id}`,
    {method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },

    body: JSON.stringify(item)})
    .then(response => {
      
      console.log(response)
    })
    .catch(err => console.log(err));
    
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

  onDelete=(i)=>{
    console.log("item",i._id);
    api.delete(`/delete/${i._id}`)
    .then(res=>{
    
        console.log("suscces,",res.status)

        if(res.status === 200){
          console.log("status");
          const filter = this.state.assignment.filter(e => e._id !== i._id)
          console.log("filter",filter);
          this.setState({assignment:filter})
        }

    })
    .catch(err=>{
        console.log("error, ", err)
    })
  }


render(){
    // if(!Array.isArray(this.state.assignment)){
    //     this.state.assignment = [this.state.assignment]

    // }
    const r = this.state.assignment.find(elements=>elements.student == isAuthenticated().user.uname);
    const sd = this.state.assignment.map(element => element );
 /*    const result = sd.find( ({ name }) => name === 'cherries' ); */

    const f = sd.find(e => e.course_id == "5f968f911636f524bc9ce931")

    console.log("assignment",sd)
    console.log("assignment",this.state.assignment_id)
    console.log("assignme",JSON.stringify(f));
    
     
   

    return (
        <Base title={`Assignments `} description={`List of all assignments`}>
        <div className="ui grid container" style={{display:'flex',justifyContent:'center'}} >
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

         
           {this.state.assignment.length === 0?<h1 style={{color:'black',textAlign:'center'}}>No Assignment assigned</h1>:
             this.state.assignment.map(item =>{
               return <div className="ui segment "  > 
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
         <FontAwesomeIcon icon={faTrash} color="#ff4d4d" size="2x" style={{hover:{color:"black"}}} />
         </span>
        
      
         <span style={{padding:"10px"}} data-tip data-for="viewTip" onClick={()=>{this.clickHandler(item._id)}} >
         <FontAwesomeIcon icon={faFolder} color="green" size="2x" style={{hover:{color:"black"}}} />
         </span>
         <ReactTooltip id="deleteTip"  place="top" >Delete Assignment </ReactTooltip>
         
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
        </form></div>
        
        </div>
        </div>
        : <h1></h1>

}

    </div>
        {
          
    
  }
    
    </Base>
    
    )
}
}
