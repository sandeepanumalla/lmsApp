import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import { useHistory } from "react-router";

export default function Home() {
  console.log("API IS", API);
  const history = useHistory()
  return (
    <Base title='EdApp ' description="Welcome to Ed App an LMS App"  >
      <div className="row">
        <div className="home_grid">
          <ul> 
           <li>✓   An LMS web app where a user like teacher an student can connect each other share 
             the useful resources to help manage learning easily.</li>
           <li> ✓   A student could do register a new subject and submit an assignment, see announcements, comment on it. </li>
           <li>✓   The teacher can create a new subject and post the assignment and evaluate the scores. </li>
           <li>✓   The teacher can post assignments,annoucements to share the resources.</li>
           <li>✓   Student can comment on the annoucements to make learning more collaborative.</li>
           
          </ul>
         
        </div>
      </div>
      <footer style={{position:"absolute",left:'0px',right:'0px'}} className="footer bg-light mt-auto py-3">
        <div style={{display:'flex',justifyContent:'center',gap:'2rem'}} className="container-fluid bg-success text-white text-center py-3">
          
          <button onClick={()=>history.push("/")} className="btn btn-warning btn-lg">About </button>
         <a className="btn btn-warning btn-lg" target="blank" style={{textDecoration:'none',color:'black'}} href="https://github.com/sandeepanumalla/lmsApp">This project</a>
        </div>
        <div className="container">
        
        </div>
      </footer>
    </Base>
  );
}
