import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userEvent from "@testing-library/user-event";
import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";



const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul style={{height:'5rem', display:'flex',alignItems:'center'}} className="nav nav-tabs bg-dark ">
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
          Home
        </Link>
      </li>
     {isAuthenticated() && isAuthenticated().user.role === "Student" && (
      <li className="nav-item">
      <Link
        style={currentTab(history, "/user/dashboard")}
        className="nav-link"
        to="/user/dashboard"
      >
        Student Dashboard
      </Link>
    </li>
     )}
      
      {isAuthenticated() && isAuthenticated().user.role === "Teacher" && (
        <Fragment>
        <li className="nav-item">
        <Link
          style={currentTab(history, "/admin/dashboard")}
          className="nav-link"
          to="/admin/dashboard"
        >
          Teacher Dashboard
        </Link>
      </li>
      
      </Fragment>
      )}

      
      
      {!isAuthenticated() && (
        <Fragment>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/signup")}
          className="nav-link"
          to="/signup"
        >
          Signup
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/signin")}
          className="nav-link"
          to="/signin"
        >
          Sign In
        </Link>
      </li>
      
      </Fragment>
      )}
      
      {isAuthenticated() && (
        <li style={{cursor:"pointer"}} className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}

{isAuthenticated() && isAuthenticated().user.role === "Student" && (
      <li className="nav-item">
      <Link style={currentTab(history, "/courses")} className="nav-link" to="/courses">
        Register
      </Link>
    </li>)}
 

    </ul>
 
  </div>
);

export default withRouter(Menu);
