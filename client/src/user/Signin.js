import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect, useHistory } from "react-router-dom";
import '../../node_modules/semantic-ui-css/semantic.min.css'
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";
import UserDashboard from "./UserDashBoard";


const Signin = () => {
  const history = useHistory()
  const [values, setValues] = useState({
    uname: "",
    password: "",
    error: "",
    error1:"",
    role: "",
    loading: false,
    success: false,
    didRedirect: false
  });

  const { error1,uname, password, error, loading, didRedirect, role,success } = values;
  const { user } = isAuthenticated();
console.log("isAuthenticated",user)

  
  const onItem = e => {
    setValues({...values, error: false, role: e})
   console.log("clicked me!", e)
  }
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

   const signin = user => {
    return fetch(`/api/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        console.log("rsponse, ",response)
        if(response.ok===false){
          setValues({...values,error1:"Invalid details"})
          console.log("invalid details")
        }
        return response.json();
      })
      .catch(err => console.log(err));
  };

var redirectRole ="Teacher"
  const performRedirect = () => {

    //TODO do a redirection
    if(didRedirect){
      if(user && user.role === redirectRole){
        console.log("inside didredirect user.role ==- ",user.role);
        return <Redirect to="/admin/dashboard" />
      }
      else{
         return <Redirect to="/user/dashboard" />
      }
    }
    if(isAuthenticated()){
      return <Redirect to="/" /> 
    }
  }
  const onSubmit = event => {
    event.preventDefault();

    
    if( uname === "" || password === "" || role === "" ){
      console.log("is it rinng")
      setValues({...values, error:" Please enter all the credentials to login"})
    }
    
    /* if(role === ""){
      console.log("running");
      setValues({...values, error:"please select user role"})
    } */
    
    else{
      signin({ uname, password, role })
      .then((data,err) => {
       
 /*      console.log("onsubmit",data);
      console.log("onsubmit2",isAuthenticated());
       */
      if (data === "Incorrect  password" || data === "incorrect Username"){
        console.log("da")
        return setValues({...values, error:" Wrong username or password "})
      }
      else if(data === "Invalid role selected"){
        console.log("da2");
        return setValues({...values, error:" Invalid role selected"})
      }
      
      
      /* if(isAuthenticated() === false){
        console.log("da2")
        return setValues({...values, error:"ivalued details"})
      } */

       else{ setValues({ ...values, error: "", loading: true });
        /* setValues({ ...values, error: false, loading: true }); */
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
              success: true
            });
          });}
        
      })
      .catch(err=>{console.log("signin request failed",err)});
    }

    
  };

  const LoadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    console.log("error sdfsdf",error)
    return (
      
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Errors with your submission.{error}
          </div>
        </div>
      </div>
    );
  };

  
 
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <div style={{display: "flex",flexDirection:'column'}} className="col-md-6 offset-sm-3 text-left">
          <div className="ui large buttons">
          <button onClick={(data)=>{onItem("Teacher")}}  className="ui button">Teacher</button>
          <div className="or"></div>
          <button onClick={(data)=>{onItem("Student")}} className="ui button">Student</button>
        </div>
          </div>
          <form>
          
            <div className="form-group">
              <label className="text-dark">Username</label>
              <input
                onChange={handleChange("uname")}
                value={uname}
                className="form-control"
                type="text"
              />
            </div>

            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
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

  return (
    <Base title="Sign In page" description="A page for user to sign in!">
      {LoadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      
      </Base>
      );
    };
    
    export default Signin;
    
    /* <p className="text-dark text-center">{JSON.stringify(values)}</p> */
