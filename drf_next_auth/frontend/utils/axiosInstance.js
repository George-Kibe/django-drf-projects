import axios from "axios"

const baseURL = "http://localhost:8000/api"

const token = localStorage.getItem('access') ? localStorage.getItem('access') : ""
const refresh = localStorage.getItem('refresh') ? localStorage.getItem('refresh') : ""

console.log("Access Token", token)
const axiosInstance = axios.create({
    baseURL: baseURL,
    "Content-Type": "application/json",
    headers: {
        Authorization: localStorage.getItem('access') ? `Bearer ${token}` : null
    }
})

export default axiosInstance;