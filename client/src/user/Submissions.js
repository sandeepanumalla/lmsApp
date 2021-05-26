import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'
import { api, BASE_URL, isAuthenticated } from '../auth/helper'
import Base from '../core/Base'



export default class Submissions extends Component {

    state={
        submissions:{},
        solutions:[],
        question:[],
        object_id:[],
        answer:[],
        values:"1",
        submitted_value:null,
        error:"",
        ok:"",
        success:false,
        click:false
    }

    
    constructor(props){
        super()
        this.handleChange = this.handleChange.bind(this);
    }
    
    async componentDidMount(){
        try{
            const data = await fetch(`/api/users/${isAuthenticated().user._id}/assignment/${this.props.match.params.id}`,{
                method:'GET',
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${isAuthenticated().token}`
                },
                body: JSON.stringify()
            });
            const response = await data.json();
          
            this.setState({submissions:response})
            this.setState({question:response.question})
            this.setState({solutions:response.solutions})
        }
        catch(err){
            alert('Unexpected error occured'+err);
        }
      
    }
    
    
    
    clickHandler(solution){

        // console.log("question is ",solution.solution);
        this.setState({answer:solution.solution})
        this.setState({object_id:solution._id})
        // console.log("object_id is ",this.state.object_id);
        this.setState({click:true})
    }

   handleChange=event =>{
      
       this.setState({values: event.target.value})
   }

  
clickk= async (event)=>{
    try{
        const value = this.state.values;
        // console.log("value ",value)
        const response = await fetch(`/api/users/${this.state.object_id}/assignment`,
        {
            method:"POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
              },
              body: JSON.stringify({value})
        })
        const data = await response.json();
       
        if(response.status == 200){
            this.setState({ ...this.state,
                solutions:[data],
                success: true
             })
        }
       
    }
    catch(err){
        alert(`Unexpected error occured`+err);
        this.setState({...this.state, error:false})
    }
   
}
    render() {
//         if(!Array.isArray(this.state.submissions)){
//             this.state.submissions = [this.state.submissions]
// }
  
  const array = [];
  for(let i=0;i<=10;i++){
    array.push(i);                
}
  
        
        return (
            <Base  description={``} title={`Assignment Submissions`}>
            <div className="ui grid container" style={{display:'flex',
            justifyContent:'center',width:'100%',flexWrap:'wrap',gap:'.5rem'}}>
        <div className="first_column" style={{width:'38rem'}} >
        
          <div className="ui container" style={{border:"2px solid black",borderRadius:"12px",overflow:"hidden"}}>
          <div style={{display:"flex", justifyContent:"space-around",allignItems:"center"}}>
          <h1 className="text-dark">Submissions</h1>
          </div>

          {
            this.state.solutions && this.state.solutions.map(item => {
                  return  <div key={item._id} className="ui segment "  > 
                  <div className="flex_container" style={{padding:"17px",display:'flex',justifyContent:'center'}}>
                  <h4 className="text-dark" >from:  {item.student} 
                  </h4>
                  </div>
                  <div className="flex_item" style={{padding:"17px",display:'flex',
                  justifyContent:'center',flexWrap:'wrap',flexDirection:'row'}}>
                  <button className="ui green button" onClick={()=>{this.clickHandler(item)}} > view</button>
                  </div>

                  {( this.state.solutions[0].results === null) ?
                      <div className="d-flex justify-content-center"  style={{padding:"17px"}}>
                      <h4 style={{fontWeight:'600'}} className="text-dark"> Grade not Assigned </h4>
                      </div>:
                      <div className="d-flex justify-content-center" style={{padding:"17px"}}>
                       <h4 style={{fontWeight:'600'}} className="text-dark"> Grade Assigned:{item.results} </h4>
                      </div>
                    } 
                  </div>
              }
                )
          }
    
    </div>
    </div>
    { this.state.click ?
        <div className="second_column" style={{width:'38rem'}}>
    <div className="ui container"  style={{border:"2px solid black",borderRadius:"12px",overflow:"hidden"}}>
    
        <h1 className="text-dark">Evaluation</h1>
        <div className="ui segment "  > 
                  <div className="d-flex justify-content-center" style={{padding:"17px"}}>
                  <h3 className="text-dark" >Question:  {this.state.question} 
                  </h3>
                  </div>
                  <div className="d-flex justify-content-center" style={{padding:"13px"}}>
                  <h4 className="text-dark" >Answer:  {this.state.answer} 
                  </h4>
                  </div>
                  <div className="d-flex justify-content-center" style={{padding:"13px"}}>
                  <select  value={this.state.values} onChange={this.handleChange} className="ui search dropdown">
                  <option value>Points</option>
                  { 
                      array.map(i =>{
                          return <option value={`${i}`}>{`${i}`}</option>
                      })
                  }
                  </select>
                  </div>
                  <div className="d-flex justify-content-center" style={{padding:"13px"}}>
                  <button className="ui green button" onClick={this.clickk}>Submit Grade</button>
                  </div>
                  
                  </div>
    </div>
    </div>
: <h1></h1>
}
    
    </div>
  
            </Base>   
        )
    }
}

