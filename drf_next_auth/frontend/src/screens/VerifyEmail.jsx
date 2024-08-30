/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import {toast} from 'react-toastify';
import axios from "axios";
import InputBox from "../components/InputBox";


const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit= async(e) => {
    e.preventDefault();
    if (!otp) return toast.error('OTP is required');
    setLoading(true);
    try {
      const data = {otp}
      const response = await axios.post('http://localhost:8000/api/accounts/verify-email/', data)
      if (response.status === 200) {
        toast.success(`${response.data.message}`);
      }else{
        toast.error('Email verification failed. Try Again');
      }
      navigate('/login');
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false);
  }

  return (
    <section className="bg-gray-1 dark:bg-dark">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white p text-center dark:bg-dark-2">
              <h3 className="mb-10 text-2xl font-semibold">Sign Up</h3>
              <form onSubmit={handleSubmit}>
                <InputBox type="text" name="first_name" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP" />
                <div className="mb-10">
                  <input
                    type="submit"
                    value={loading ? 'Loading...' : 'Confirm Email'}
                    className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium transition hover:bg-opacity-90"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
