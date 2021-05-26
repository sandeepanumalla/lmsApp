import { API } from "../../backend";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import { json } from "body-parser";

// http://localhost:8000/api/users
export const BASE_URL = ``;

 
export const signup =async user => {
  // console.log("body",user)
  const data = await fetch(`/api/users/register`, { 
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
  })
    const result = await data.json();
    // console.log(result);  
    return data;
};



export const authenticate = (data, next) => {
    localStorage.setItem("jwt", JSON.stringify(data));
    // console.log("maind data",data)
    next();
  
};


export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`/api/users/signout`, {
      method: "GET"
    })
      .then(response => console.log("signout success"))
      .catch(err => console.log(err));
  }
};

export const isAuthenticated = () => {
 
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false; 
  }
};



export const api = Axios.create({
  baseURL: ``,
  headers: {
  
    Authorization: `Bearer ${isAuthenticated().token}`
  }
})

 
export const fetchAssignment = async (params)=>{
  // console.log("params",params);
  const data = await fetch(`/api/users/courses/${params}/assignment`,{
    method:'GET',
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify()
  })
  const response = await data.json();
  return response
} 

export const  registered=async ()=>{
  // console.log("rindfdfdfasfadfasdf",isAuthenticated().user._id);
   const response =  await fetch(`/api/users/${isAuthenticated().user._id}/student/registered`,{
      method: "GET", 
  headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${isAuthenticated().token}`
  },
  body: JSON.stringify() 
    })
    
    const data = await response.json();
    // console.log('registered',data)
    return data;
}


export const courseData = async ()=>{

   const response = await fetch(`/api/users/student/courses`,{
      method: "GET", 
  headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${isAuthenticated().token}`
  },
  body: JSON.stringify() 
    })
  
    return response;

}

export const getCourses = async (event) =>{
  const response = await fetch(`/api/users/student/registered`,
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
  // console.log(courseid);
  
  const response = await fetch(`/api/users/${isAuthenticated().user._id}/course/register/${courseid}`,{
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
  const response = await fetch(`/api/users/${course_id}/course/deregister/${isAuthenticated().user._id}`,{
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
  // console.log("rindfdfdfasfadfasdf",isAuthenticated().user._id);
   const data = await fetch(`/api/users/courses/enrolled/${isAuthenticated().user._id}`,{
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

export const studentCourses= async ()=>{
  const response = await fetch(`/api/users/${isAuthenticated().user._id}/student/registered`,{
          method: "GET",
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
      },
      body: JSON.stringify()
    })
    return response;
}

export const addAnnoucementAPI = async (course_id,body)=>{
  // console.log("check courseid and body",course_id,body);
  const response = await fetch(`/api/annoucements/addAnnoucements/${course_id}/${isAuthenticated().user._id}`,{
          method: "POST",
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
      },
      body: JSON.stringify(body)
    })
    return response;
}

export const getAnnoucementAPI = async (course_id)=>{
  // console.log("check course_id",course_id);
  const response = await fetch(`/api/annoucements/getAnnoucements/${course_id}`,{
    method: "GET",
headers: {
Accept: "application/json",
"Content-Type": "application/json",
Authorization: `Bearer ${isAuthenticated().token}`
},
body: JSON.stringify()
})
return response;
}

export const deleteAnnoucementAPI = async(annoucement_id)=>{
  // console.log("annouc",annoucement_id)
  const response = await fetch(`/api/annoucements/deleteAnnoucements/${annoucement_id}`,
  {
    method:'DELETE',
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body:JSON.stringify()
  })
  return response;
}

export const getOneAnnoucement = async(id)=>{
  // console.log(id);
  const response = await fetch(`/api/annoucements/getAnnoucementbyId/${id}`,{
    method:"GET",
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body:JSON.stringify()
  })
  // console.log(response);
  return response;
}

export const addReply = async (commentId,announcementId,body) =>{
  const post ={ 
    content:body
  }
  // console.log(commentId,announcementId,body);
  const endpoint = `/api/annoucements/reply/${isAuthenticated().user._id}/${announcementId}/${commentId}`;
  // console.log("endpoint",endpoint);
    const response = await fetch(endpoint,{ 
    method:'POST',
    headers:{
      Accept:"application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body:JSON.stringify({content:body})
  });
  return response; 
}
 
export const addComment = async(announcementId,body)=>{ 
// console.log(body);
  const endpoint = `/api/annoucements/comment/${isAuthenticated().user._id}/${announcementId}`;
  // console.log("endpoint",endpoint);
    const response = await fetch(endpoint,{ 
    method:'POST',  
    headers:{
      Accept:"application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body:JSON.stringify({content:body})
  });
  return response; 
}

export const submitAssignment = async (item, id)=>{
  const response = await fetch(`/api/users/${isAuthenticated().user._id}/courses/${id}`,
    {method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify(item)})
   return response;
}

export const EditAnnouncementAPI = async (id, body)=>{
  const response = await fetch(`/api/annoucements/edit/${id}`,
    {method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify(body)})
   return response;
}

export const deleteReplies = async (annoucementId,commentId,currId)=>{
  const response = await fetch(`/api/annoucements/delete-reply/${annoucementId}/${commentId}/${currId}`,{
    method:"Delete",
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify()
  }) 
  //console.log(response);
  return response;

}
export const deleteCommentAPI = async (annoucementId,commentId)=>{
  const response = await fetch(`/api/annoucements/delete-comment/${annoucementId}/${commentId}`,{
    method:"Delete",
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify()
  }) 
  // console.log(response);
  return response;
 
}

