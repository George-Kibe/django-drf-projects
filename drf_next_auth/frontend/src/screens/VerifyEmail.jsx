/* eslint-disable react/prop-types */

import { useState } from "react";
import InputBox from "../components/InputBox";


const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit= (e) => {
    e.preventDefault();
    console.log('submitted');
    setLoading(true);
    setLoading(false);
  }

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
