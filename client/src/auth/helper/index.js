import { API } from "../../backend";
import axios from 'axios';
import { useParams } from "react-router-dom";

export const BASE_URL = `http://localhost:8000/api/users`;

// axios.interceptors.response.use(null, error =>{
//   console.log('INTERCEPTOR CALLED');
//   return Promise.reject(error);
// })

export const signup =async user => {
  return fetch(`${BASE_URL}/register`, {
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

    return fetch(`${BASE_URL}/signout`, {
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
  baseURL: `${BASE_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${isAuthenticated().token}`
  }
})

 
export const fetchAssignment = async (params)=>{
  console.log("params",params);
  const data = await fetch(`${BASE_URL}/courses/${params}/assignment`,{
    method:'GET',
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify()
  })
  const response = await data.json()
  return response
} 

export const  registered=async ()=>{
  console.log("rindfdfdfasfadfasdf",isAuthenticated().user._id);
   const response =  await fetch(`${BASE_URL}/api/users/${isAuthenticated().user._id}/student/registered`,{
      method: "GET", 
  headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${isAuthenticated().token}`
  },
  body: JSON.stringify() 
    })
    
    const data = await response.json();
    console.log('registered',data)
    return data;
}


export const courseData = async ()=>{
//  try{
   const response = await fetch(`/student/courses`,{
      method: "GET", 
  headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${isAuthenticated().token}`
  },
  body: JSON.stringify() 
    })
    // const data = await response.json();
    // console.log('courseDAta',data)
    return response;
  // }
  // catch(err){
  //   if(err.response && err.response.status === 404 ){
  //     alert('Bad Request')
  //     return err;
  //   }
  //   else{
  //     console.log('Logging the error',err);
  //     alert('Unexpected error occurred.')
  //     return err;
  //   }
  // }
}

export const getCourses = async (event) =>{
  const response = await fetch(`${BASE_URL}/student/registered`,
  {
      method:"GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuthenticated().token}`
        },
        body: JSON.stringify(event)
  })

  const data = await response.json();

  return data;
} 

export const registerHandlerFetch = async(courseid)=>{
  console.log(courseid);
  
  const response = await fetch(`${BASE_URL}/${isAuthenticated().user._id}/course/register/${courseid}`,{
    method:'POST',
    headers:{
      Accept:'application/json',
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify()
  })

 

    return response;
}

export const  onDeregisterFetch = async(course_id)=>{
  const response = await fetch(`${BASE_URL}/${course_id}/course/deregister/${isAuthenticated().user._id}`,{
    method:"POST",
    headers:{
      Accept:'application/json', 
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body:JSON.stringify()
  })

  return response;
}
export const fetchh=async ()=>{
  console.log("rindfdfdfasfadfasdf",isAuthenticated().user._id);
   const data = await fetch(`http://localhost:8000/api/users/courses/enrolled/${isAuthenticated().user._id}`,{
      method: "GET",
  headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${isAuthenticated().token}`
  },
  body: JSON.stringify() 
    })
    return data.json();
  }
