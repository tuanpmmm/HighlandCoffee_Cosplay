import axios from 'axios';


export const getAllProducts = async (filter) => {
    return await axios.post(`http://localhost:5000/products`, filter);
}

export const createProduct = async (data) => {
    return await axios.post('http://localhost:5000/products/create', data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getDetailProduct = async (id) => {
    return await axios.get(`http://localhost:5000/products/detail/${id}`);
}

export const getByCategoryId = async (id) => {
    return await axios.get(`http://localhost:5000/products/category/${id}`);
}


export const updateProduct = async (id, data) => {
    return await axios.put(`http://localhost:5000/products/update/${id}`, data, {
        headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

// export const deleteProduct = async (id) => {
//     return await axios.put(`http://localhost:5000/products/delete/${id}`, {
//         headers: {
//             'token': `Bearer ${localStorage.getItem('token')}`
//         }
//     })
// }