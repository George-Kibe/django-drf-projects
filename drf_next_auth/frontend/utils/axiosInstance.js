import axios from "axios"
import {jwtDecode } from "jwt-decode"
import dayjs from "dayjs"

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

axiosInstance.interceptors.request.use(async req => {
    if(token){
        req.headers.Authorization = `Bearer ${token}`
        const user = jwtDecode(token)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
        if(!isExpired){
            return req
        }else{
            const response = await axios.post(`${baseURL}/accounts/token/refresh/`, {
                refresh: refresh
            })
            console.log("Refresh Data ",response.data)
            if (response.status === 200) {
                localStorage.setItem('access', response.data.access)
                req.headers.Authorization = `Bearer ${response.data.access}`
                return req
            } else{
                const response = axios.post("/accounts/logout/", {"refresh_token": refresh});
                console.log("Logout response: ", response.data);
                if (response.status === 200) {
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    // navigate("/");
                }
            }
        }
    } 
})

export default axiosInstance;