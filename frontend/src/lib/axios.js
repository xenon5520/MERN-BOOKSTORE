import axios from "axios";
const api = axios.create({
    baseURL: 'https://mern-bookstore-w63q.onrender.com'
})
export default api
