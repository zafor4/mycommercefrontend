import axios from "axios";
import { API } from "../../utils/config"; 


export const register=(user)=>{
    return axios.post("https://mycommerce-iy3p.onrender.com/api/user/signup",user,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export const login=(user)=>{
    return axios.post("https://mycommerce-iy3p.onrender.com/api/user/signin",user,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}