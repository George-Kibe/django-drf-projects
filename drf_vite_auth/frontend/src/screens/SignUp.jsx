/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance"
import { useNavigate, useSearchParams } from "react-router-dom";
import {toast} from "react-toastify";
import InputBox from "../components/InputBox";


const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleResponse = async(response) => {
    const payload = response.credential
    try {
      const serverResponse = await axios.post("http://localhost:8000/api/accounts/social/google/", {
        "access_token": payload
      });
      console.log("Server Response: ", serverResponse);
      toast.success("Login successful. Welcome!")
        const userInfo = {
          name: serverResponse.data.full_name,
          email: serverResponse.data.email,
        }
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
        localStorage.setItem("access", serverResponse.data.access_token)
        localStorage.setItem("refresh", serverResponse.data.refresh_token)
        navigate("/profile")
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    /* Global Google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("google-button"),
      { theme: "outline", size: "large", text:"continue_with", shape:"cirlce" }
    );
  }, [])
  
  
  const handleSubmit= async(e) => {
    e.preventDefault();
    console.log('submitted');
    setLoading(true);
    if (!first_name || !last_name || !email || !password || !confirm_password) {
      setError('All fields are required');
      console.log('All fields are required');
      setLoading(false);
      return;
    }
    if (password !== confirm_password) {
      setError('Passwords do not match');
      console.log('Passwords do not match');
      setLoading(false);
      return;
    }
    const data = {
      first_name,
      last_name,
      email,
      password,
      password2: confirm_password
    };
    console.log(data);
    try {
      const response = await axios.post('http://localhost:8000/api/accounts/register/', data)
      console.log("Response: ", response);
      if (response.status === 201) {
        navigate('/otp/verify-email');
        toast.success(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  }

  const handleLoginWithGithub = async () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize/?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}
      ` 
    );
  }

  const sendGithubCodeToBackend = async() => {
    if (!searchParams.get('code')) {
      return;
    }
    const code = searchParams.get('code');
    try {
      const response = await axiosInstance.post("/accounts/social/github/", {
        code
      });
      console.log("Github Server Response: ", response);
      if (response.status === 200) {
        toast.success("Login successful. Welcome!")
        const userInfo = {
          name: response.data.full_name,
          email: response.data.email,
        }
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
        localStorage.setItem("access", response.data.access_token)
        localStorage.setItem("refresh", response.data.refresh_token)
        navigate("/profile")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  let code = searchParams.get('code');
  useEffect(() => {
    if (!code) {
      return;
    }
    sendGithubCodeToBackend();
  }, [code]);

  return (
    <section className="bg-gray-1 dark:bg-dark">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white p text-center dark:bg-dark-2">
              <h3 className="mb-10 text-2xl font-semibold">Sign Up</h3>
              <div className="mb-4 text-center md:mb-4">
                {error && <p className="text-red-500">{error}</p>}
              </div>
              <form onSubmit={handleSubmit}>
                <InputBox type="text" name="first_name" value={first_name} onChange={(e) => setFirst_name(e.target.value)} placeholder="First Name" />
                <InputBox type="text" name="last_name" value={last_name} onChange={(e) => setLast_name(e.target.value)} placeholder="Last Name" />
                <br />
                <InputBox type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <InputBox
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <InputBox
                  type="password"
                  name="confirm_password"
                  value={confirm_password}
                  onChange={(e) => setConfirm_password(e.target.value)}
                  placeholder="Password"
                />
                <div className="mb-10">
                  <input
                    type="submit"
                    value={loading ? 'Loading...' : 'Sign Up'}
                    className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium transition hover:bg-opacity-90"
                  />
                </div>
              </form>
              <p className="mb-6 text-base text-secondary-color dark:text-dark-7">
                Connect With
              </p>
              <ul className="-mx-2 mb-12 flex justify-between">
                <li className="w-full px-2">
                  <button
                    onClick={handleLoginWithGithub}
                    className="flex h-11 items-center justify-center rounded-md hover:bg-opacity-90 border-2"
                  >
                    <BsGithub className="text-2xl mr-2" /> <p>Sign In with Github</p>
                  </button>
                </li>
                <li id="google-button"></li>
              </ul>
              <a
                href="/forgot-password"
                className="mb-2 inline-block text-base text-dark hover:text-primary hover:underline text-black"
              >
                Forgot Password?
              </a>
              <p className="text-base text-body-color dark:text-dark-6">
                <span className="pr-0.5">Not a member yet?</span>
                <a
                  href="/"
                  className="hover:underline"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;