import { API } from "../../backend";
import axios from 'axios';
import { useParams } from "react-router-dom";



export const signup = user => {
  return fetch(`/api/users/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json(response);
    })
    .catch(err => console.log(err));
};

/* export const signin = user => {
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
      return response.json();
    })
    .catch(err => console.log(err));
}; */

export const authenticate = (data, next) => {
 
    localStorage.setItem("jwt", JSON.stringify(data));
    console.log("maind data",data)
    next();
  
};



export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`/api/users/register`, {
      method: "GET"
    })
      .then(response => console.log("signout success"))
      .catch(err => console.log(err));
  }
};

export const isAuthenticated = () => {
 /*  if (typeof window == "undefined") {
    return false;
  } */
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const api = axios.create({
  baseURL: `/api/users`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${isAuthenticated().token}`
  }
})

 
export const fetchAssignment = async (params)=>{
  console.log("params",params);
  const data = await fetch(`/courses/${params}/assignment`,{
    method:'GET',
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify()
  })

  const response = await data.json()
  return response;

} 







