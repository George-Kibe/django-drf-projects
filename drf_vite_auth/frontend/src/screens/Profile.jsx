import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import {toast} from 'react-toastify'
import axiosInstance from '../../utils/axiosInstance';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('userInfo'))
  const jwt_access = localStorage.getItem('access')
  const refresh = localStorage.getItem('refresh') ? localStorage.getItem('refresh') : "";
  
  const getMyProfile = async() => {
    setLoading(true)
    try {
        const response = await axiosInstance.get("/accounts/profile/")
        console.log("Profile response: ", response.data)
    } catch (error) {
       toast.error(error.message) 
    }
    setLoading(false)
  }

  useEffect(() => {
    if (jwt_access === null && !user) {
      navigate('/login')
    } else{
        getMyProfile()
    }
  }, [])

  

  const handleLogout = async() => {
    setLoading(true);
    try {
        const response = await axiosInstance.post("/accounts/logout/", {"refresh_token": refresh});
        console.log("Logout response: ", response.data);
        if (response.status === 200) {
            localStorage.removeItem("userInfo");
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            navigate("/");
        }
    } catch (error) {
        toast.error(error.message)
    }
    setLoading(false);
  }
  
  return (
    <div className="p-4 md:p-8">
        <div className="flex items-center gap-x-3">
        <div className="shrink-0">
            <img className="shrink-0 size-16 rounded-full" src="https://images.unsplash.com/photo-1510706019500-d23a509eecd4?q=80&w=2667&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Avatar" />
        </div>

        <div className="grow">
            <h1 className="text-lg font-medium text-gray-800">
            {user?.name}
            </h1>
            <p className="text-sm text-gray-600 dark:text-neutral-400">
            Graphic Designer, Web designer/developer
            </p>
        </div>
        </div>
        <div className="mt-8">
        <p className="text-sm text-gray-600 text-justify dark:text-neutral-400">
            I am a seasoned graphic designer with over 14 years of experience in creating visually appealing and user-centric designs. My expertise spans across UI design, design systems, and custom illustrations, helping clients bring their digital visions to life.
        </p>

        <p className="mt-3 text-sm text-gray-600 text-justify dark:text-neutral-400">
            Currently, I work remotely for Notion, where I design template UIs, convert them into HTML and CSS, and provide comprehensive support to our users. I am passionate about crafting elegant and functional designs that enhance user experiences.
        </p>

        <ul className="mt-5 flex flex-col gap-y-3">
            <li className="flex items-center gap-x-2.5">
            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <a className="text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400" href="#">
                elianagarcia997@about.me
            </a>
            </li>

            <li className="flex items-center gap-x-2.5">
            <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.1881 10.1624L22.7504 0H20.7214L13.2868 8.82385L7.34878 0H0.5L9.47944 13.3432L0.5 24H2.5291L10.3802 14.6817L16.6512 24H23.5L14.1881 10.1624ZM11.409 13.4608L3.26021 1.55962H6.37679L20.7224 22.5113H17.6058L11.409 13.4613V13.4608Z" fill="currentColor"/></svg>
            <a className="text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400" href="#">
                @elianagarcia997
            </a>
            </li>

            <li className="flex items-center gap-x-2.5">
            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"/></svg>
            <a className="text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400" href="#">
                @elianagarcia997
            </a>
            </li>
        </ul>
        </div>
        <div className="mt-8 flex items-center gap-x-3">
            <button onClick={handleLogout} className="inline-flex items-center justify-center rounded-md border-2 border-primary py-2 px-4 text-center text-base font-medium text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 lg:px-6">{loading? "Loading..." : "Logout"}
            </button>
        </div>
        <div className="mt-8 flex items-center gap-x-3">
            <button onClick={getMyProfile} className="inline-flex items-center justify-center rounded-md border-2 border-primary py-2 px-4 text-center text-base font-medium text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 lg:px-6">{loading? "Loading..." : "Get Profile"}
            </button>
        </div>
    </div>
  )
}

export default Profile