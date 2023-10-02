import axios from 'axios';


export const login = async (data) => {
    return await axios.post(`http://localhost:5000/customers/login`, data);
}

export const update = async (id) => {
    return await axios.put(`http://localhost:5000/customers/update/${id}`);
}

export const getAllCustomer = async (data) => {
    return await axios.post(`http://localhost:5000/customers`, data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const register = async (data) => {
    return await axios.post(`http://localhost:5000/customers/register`, data, {
        withCredentials: true
    });
}

export const getProfileCustomer = async (id) => {
    return await axios.get(`http://localhost:5000/customers/${id}`);
}

export const getUserByEmail = async (email) => {
    return await axios.get(`http://localhost:5000/customers/get-by-email?email=${email}`, {
        withCredentials: true
    });
}

export const changePassword = async (id, data) => {
    return await axios.put(`http://localhost:5000/customers/change-password/${id}`, data);
}

export const forgotPassword = async (id, data) => {
    return await axios.put(`http://localhost:5000/customers/forgot-password/${id}`, data, {
        withCredentials: true
    });
}