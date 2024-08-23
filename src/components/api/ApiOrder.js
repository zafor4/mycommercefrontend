import axios from "axios";



export const addToCart=(token,cartItem)=>{
    return axios.post('https://mycommerce-iy3p.onrender.com/api/cart',cartItem,{
        headers:{
             "Content-Type": "application/json",
             'Authorization':`Bearer ${token}`
        }
    })
}

export const getCartItems=(token)=>{
    return axios.get('https://mycommerce-iy3p.onrender.com/api/cart',{
        headers:{
             'Authorization':`Bearer ${token}`
        }
    }
)
}

export const updateCartItems=(token,cartItem)=>{
    return axios.put('https://mycommerce-iy3p.onrender.com/api/cart',cartItem,{
        headers:{
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`
       }
    })
}


export const deleteCartItem=(token,cartItem)=>{
    return axios.delete(`https://mycommerce-iy3p.onrender.com/api/cart/${cartItem._id}`,{
        headers:{
            'Authorization':`Bearer ${token}`
       }
    })

}


export const getProfile=token=>{
    return axios.get("https://mycommerce-iy3p.onrender.com/api/profile",{
        headers:{
            'Authorization':`Bearer ${token}`
       }
    })
}

export const updateProfile=(token,data)=>{
    return axios.post('https://mycommerce-iy3p.onrender.com/api/profile',data,{
        headers:{
             "Content-Type": "application/json",
             'Authorization':`Bearer ${token}`
        }
    })
}

export const initPayment=token=>{

    return axios.get('https://mycommerce-iy3p.onrender.com/api/payment',{
        headers:{
            'Authorization':`Bearer ${token}`
       }
    })
}