import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect, useHistory } from "react-router-dom";
import '../../node_modules/semantic-ui-css/semantic.min.css'
import { signin, authenticate, isAuthenticated, BASE_URL } from "../auth/helper/index";
import './../styles.css';

const Signin = () => {
  const history = useHistory()
  const [values, setValues] = useState({
    uname: "",
    password: "",
    error: "",
    role: "",
    loading: false,
    success: false,
    didRedirect: false
  });

  const { error1,uname, password, error, loading, didRedirect, role,success } = values;
  const { user } = isAuthenticated();
// console.log("isAuthenticated",user)

  
  const onItem = e => {
    setValues({...values, error: false, role: e})
  //  console.log("clicked me!", e)
  }
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value.trim() });
  };

  

var redirectRole ="Teacher"
  const performRedirect = () => {

    //TODO do a redirection
    if(didRedirect){
      if(user && user.role === redirectRole){
        // console.log("inside didredirect user.role ==- ",user.role);
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
  const onSubmit = async event => {
    event.preventDefault();

    
    if( uname.trim() === "" ){
      
      setValues({...values, error:" Username is required"})
    }
    else if(password.trim() === ""){
      setValues({...values, error:"Password is required"})
    }
    else if(role.trim() === ""){
      setValues({...values, error:"Please select the role"})
    }

    else{
        
     try{
       const response = await fetch(`/api/users/login`, {
      method: "POST", 
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({uname, password, role})
    })
     const data = await response.json();
    //  console.log(data)
     if(data === "Incorrect  password" || data === "incorrect Username"){
       setValues({...values, error:" Wrong username or password "})
     }
     else if(data === "Invalid role selected"){
      // console.log("da2");
       setValues({...values, error:" Invalid role selected"}) 
    }
    else{
      setValues({ ...values, error: "", loading: true });
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
              success: true
            });
          });}
  }
    catch(err){
      if(err.response && err.response.status === 400){
        alert('Bad Request'+err) 
      }
      else{
        alert('Unexpect error occured'+err)
      }
       
    }

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
    // console.log("error sdfsdf",error)
    return (
      
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
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

  
 
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <div style={{display: "flex",flexDirection:'column'}} className="col-md-6 offset-sm-3 text-left">
          <div className="ui large buttons">
          <button onClick={(data)=>{onItem("Teacher")}}  className={role == "Teacher" ? `ui button selected`:`ui button`}>Teacher</button>
          <div className="or"></div>
          <button onClick={(data)=>{onItem("Student")}} className={role == "Student" ? `ui button selected`:`ui button`}>Student</button>
        </div>
          </div>
          <form>
          
            <div className="form-group">
              <label className="text-dark">Username</label>
              <input
              autoFocus
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
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Welcome!" description="Enter your info below to login.">
      {LoadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
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
      );
    };
    
    export default Signin;
    
