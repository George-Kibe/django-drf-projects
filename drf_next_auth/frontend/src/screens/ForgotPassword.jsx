/* eslint-disable react/prop-types */

import { useState } from "react";
import { toast } from "react-toastify"
import InputBox from "../components/InputBox";
import axiosInstance from "../../utils/axiosInstance";


const ForgotPassWord = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit= async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/accounts/password-reset/", {"email": email})
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Password reset link sent to your email")
      }
      setEmail("")
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
              <h3 className="mb-10 text-2xl font-semibold">Reset Password</h3>
              <form onSubmit={handleSubmit}>
                <InputBox type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
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

export default ForgotPassWord;