import Axios from "axios";
import { api } from "../auth/helper";


api.interceptors.response.use(null, error =>{
    const expectedError = 
    error.response && error.response.status >= 400 && error.response.status<500;

    if(!expectedError){
        console.log("logging the error", error);
        alert("An unexcpected error occurred")
    }

    return Promise.reject(error)
})

export default{
    get: api.get,
    post: api.post,
    put:api.put,
    delete:api.delete
}