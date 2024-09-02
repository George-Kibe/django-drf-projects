/* eslint-disable react/prop-types */

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputBox from "../components/InputBox";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";


const ResetPassword = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit= async(e) => {
    e.preventDefault();
    console.log('submitted');
    setLoading(true);
    const data = {
      confirm_password,
      password,
      uuidb64: uid,
      token: token,
    };
    try {
      const response = await axiosInstance.patch('/accounts/set-new-password/', data);
      console.log("Password Reset Response", response);
      if (response.status === 200) {
        navigate('/login');
        toast.success("Password reset successfully");
      }
    } catch (error) {
      setError(error)
      toast.error(error.message)
    }
    console.log(data);
    setLoading(false);
  }

  return (
    <section className="bg-gray-1 dark:bg-dark">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white p text-center dark:bg-dark-2">
              <h3 className="mb-10 text-2xl font-semibold">Reset Password</h3>
              <div className="mb-4 text-center md:mb-4">
                {error && <p className="text-red-500">{error}</p>}
              </div>
              <form onSubmit={handleSubmit}>
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
                  value={password} 
                  onChange={(e) => setConfirm_password(e.target.value)} 
                  placeholder="Password" 
                />
                <div className="mb-10">
                  <input
                    type="submit"
                    value={loading ? 'Loading...' : 'Reset Password'}
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

export default ResetPassword;