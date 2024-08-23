
import axios from 'axios';

export const getProducts = (sortBy, order, limit) => {
    return axios.get(`https://mycommerce-iy3p.onrender.com/api/product?sortBy=${sortBy}&order=${order}&limit=${limit}`)
}

export const getProductDetails = (id) => {
    return axios.get(`https://mycommerce-iy3p.onrender.com/api/product/${id}`)
}

export const getCategories = () => {
    return axios.get(`https://mycommerce-iy3p.onrender.com/api/category`)
}


export const getFilteredProducts = (skip, limit, filters = {}, order, sortBy) => {
    const data = {
        order: order,
        sortBy: sortBy,
        limit: limit,
        skip: skip,
        filters: { ...filters }
    }
    return axios.post(`https://mycommerce-iy3p.onrender.com/api/product/filter`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}