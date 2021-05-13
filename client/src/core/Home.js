import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import { useHistory } from "react-router";

export default function Home() {
  console.log("API IS", API);
  const history = useHistory()
  return (
    <Base title='LMS App ' description="Welcome to LMS app"  >
      <div className="row">
        <div className="home_grid">
          <ul> 
           <li>An LMS web app where a user can be student or teacher.</li>
           <li>A student could do register a new subject and submit an assignment. </li>
           <li>The teacher can create a new subject and post the assignment and evaluate the scores. </li>
           <li>The student can register the courses and deregister the same if not interested.</li>
          </ul>
         
        </div>
      </div>
      <footer style={{position:"absolute",left:'0px',right:'0px'}} className="footer bg-light mt-auto py-3">
        <div style={{display:'flex',justifyContent:'center',gap:'2rem'}} className="container-fluid bg-success text-white text-center py-3">
          
          <button onClick={()=>history.push("/")} className="btn btn-warning btn-lg">About </button>
          <button className="btn btn-warning btn-lg">Contact </button>
        </div>
        <div className="container">
        
        </div>
      </footer>
    </Base>
  );
}
