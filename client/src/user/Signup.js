import React, { useState } from "react";
import Base from "../core/Base";
import { Link, useHistory } from "react-router-dom";
import { signup } from "../auth/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Signup = () => {
  const history  =useHistory();
  const [values, setValues] = useState({
    uname: "",
    fname: "",
    lname: "",
    password: "",
    error: "",
    role: "",
    success: false
  });

  const { uname, fname, password, error, success, lname, role } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = async event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    if(uname.length < 3 || lname.length < 3 || fname.length < 3 || password.length < 3 ){
      setValues({...values,error:'please enter all details. Minimum 3 characters'})
    }
    else{
      try{
        const response  = await signup({ uname, fname, lname, password, role });
        const data = await response.json();
        if(response.status === 409){
          setValues({...values, error:"User with same username already registered"})
        }
        else{
          setValues({
            ...values,
            uname: "",
            fname: "",
            lname: "",
            role: "",
            password: "",
            error: "",
            success: true,
            
          });
        }
      }
      catch(err){
          alert('unexpected error occured'+err);
      }
     
    //   .then(data => {
    //      console.log("daataaa",data)
    //       setValues({
    //         ...values,
    //         uname: "",
    //         fname: "",
    //         lname: "",
    //         role: "",
    //         password: "",
    //         error: "",
    //         success: true,
            
    //       });
        
    //   })
    //   .catch(console.log("Error in signup"));
    // }
    }
  };

   const onItemClick = event => {
     setValues({...values, error: false, role: event})
    console.log("clicked me!", event)
   }
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <div  style={{display: "flex",flexDirection:'column'}} className="col-md-6 offset-sm-3 text-left">
        <div className="ui large buttons">
        <button onClick={(data)=>{onItemClick("Teacher")}}  className="ui button">Teacher</button>
        <div className="or"></div>
        <button onClick={(data)=>{onItemClick("Student")}} className="ui button">Student</button>
      </div>
      
        </div>
       
          <form>
            <div className="form-group">
              <label className="text-dark">Username</label>
              <input
              autoFocus
                className="form-control"
                onChange={handleChange("uname")}
                type="text"
                value={uname}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Firstname</label>
              <input
                className="form-control"
                onChange={handleChange("fname")}
                type="text"
                value={fname}
              />
            </div>

            <div className="form-group">
              <label className="text-dark">Lastname</label>
              <input
                onChange={handleChange("lname")}
                className="form-control"
                type="text"
                value={lname}
              />
            </div>
            <div className="form-group">
            <label className="text-dark">Password</label>
            <input
              onChange={handleChange("password")}
              className="form-control"
              type="password"
              value={password}
            />
          </div>
          
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div  style={{display: "flex",flexDirection:'column'}} className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div   className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}


           { 
            //  <footer style={{position:"absolute",left:'0px',right:'0px'}} className="footer bg-light mt-auto py-3">
            //   <div style={{display:'flex',justifyContent:'center',gap:'2rem'}} className="container-fluid bg-success text-white text-center py-3">

            //   <button onClick={()=>history.push("/")} className="btn btn-warning btn-lg">About </button>
            //   <button className="btn btn-warning btn-lg">Contact </button>
            //   </div>
            //   <div className="container">

            //   </div>
            //   </footer>
            }
      </Base>
      );
    };
    
    export default Signup;
    
    /* <p className="text-dark text-center">{JSON.stringify(values)}</p> */