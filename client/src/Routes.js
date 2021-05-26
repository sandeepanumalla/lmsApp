import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import Add from "./user/Add";
import AdminDashboard from "./user/AdminDashBoard";
import Annoucement from "./user/Annoucement";
import Assignments from "./user/Assignments";
import Courses from "./user/courses";
import CreateCourse from "./user/createCourse";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Submissions from "./user/Submissions";
import UserDashboard from "./user/UserDashBoard";



const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard}></PrivateRoute>
        <PrivateRoute path='/:id/assignment' exact component={Assignments}></PrivateRoute>
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}></AdminRoute>
        <AdminRoute path='/createcourse' exact component={CreateCourse}></AdminRoute>
        <AdminRoute path='/:id/assignment' exact component={Assignments}></AdminRoute>
        <AdminRoute path='/new-annoucement' exact component={Annoucement}></AdminRoute>
        <AdminRoute path='/:id/assignment/new' exact component={Add}></AdminRoute>
        <AdminRoute path='/submissions/:id' exact component={Submissions}></AdminRoute>
        <PrivateRoute path="/courses" exact component={Courses}></PrivateRoute>

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
