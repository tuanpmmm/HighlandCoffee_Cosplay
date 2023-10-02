import axios from 'axios';

export const addToOrder = (customerid) => {
    return axios.get(`http://localhost:5000/orders/pay/${customerid}`, {
        withCredentials: true
    })
}

export const gettAllOrdersWaiting = (page) => {
    return axios.get(`http://localhost:5000/orders/admin/waiting?page=${page}`, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const gettAllOrders = (page) => {
    return axios.get(`http://localhost:5000/orders/admin?page=${page}`, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const getOrderByCustomer = (customerid, page) => {
    return axios.get(`http://localhost:5000/orders/customer/?customerId=${customerid}&page=${page}`);
}

export const confirmOrder = (id, pid) => {
    return axios.get(`http://localhost:5000/orders/confirm-order?id=${id}&product_id=${pid}`, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const cancelOrder = (id, pid) => {
    return axios.get(`http://localhost:5000/orders/cancel-order?id=${id}&product_id=${pid}`);
}

export const confirmGetOrder = (id) => {
    return axios.get(`http://localhost:5000/orders/confirm-getorder/${id}`);
}
