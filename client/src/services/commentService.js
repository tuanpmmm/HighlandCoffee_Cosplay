import axios from "axios";

export const getAllComment = async (pid) => {
    return await axios.get(`http://localhost:5000/comments/get-all/${pid}`);
}

export const sendComment = async (data) => {
    return await axios.post(`http://localhost:5000/comments/send`, data);
}


export const editComment = async (data) => {
    return await axios.put(`http://localhost:5000/comments/edit`, data);
}
