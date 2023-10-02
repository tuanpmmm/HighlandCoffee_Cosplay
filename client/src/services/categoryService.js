import axios from 'axios';


export const getAllCategories = async (data) => {
    return await axios.post(`http://localhost:5000/categories`, data);
}

export const getOneCategory = async (slug) => {
    return await axios.get(`http://localhost:5000/categories/detail/${slug}`);
}

export const updateCategory = async (slug, data) => {
    return await axios.put(`http://localhost:5000/categories/update/${slug}`, data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export const createCategory = async (data) => {
    return await axios.post('http://localhost:5000/categories/create', data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    });
}