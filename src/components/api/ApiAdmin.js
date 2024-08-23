import { API } from "../../utils/config";
import axios from "axios";


export const createCategory=(token,data)=>{
    return axios.post(`https://mycommerce-iy3p.onrender.com/api/category`,data,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    })
}

export const createProduct=(token,data)=>{
    return axios.post(`https://mycommerce-iy3p.onrender.com/api/product`,data,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })

}

export const getCategories=()=>{
    return axios.get("https://mycommerce-iy3p.onrender.com/api/category")
}