/* eslint-disable react/prop-types */

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import InputBox from "../components/InputBox";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit= (e) => {
    e.preventDefault();
    console.log('submitted');
    setLoading(true);
    const data = {
      email,
      password,
    };
    console.log(data);
    setLoading(false);
  }

  return (
    <section className="bg-gray-1 dark:bg-dark">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white p text-center dark:bg-dark-2">
              <h3 className="mb-10 text-2xl font-semibold">Login</h3>
              <div className="mb-4 text-center md:mb-4">
                {error && <p className="text-red-500">{error}</p>}
              </div>
              <form onSubmit={handleSubmit}>
                <InputBox type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <InputBox
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <div className="mb-10">
                  <input
                    type="submit"
                    value={loading ? 'Loading...' : 'Login'}
                    className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium transition hover:bg-opacity-90"
                  />
                </div>
              </form>
              <p className="mb-6 text-base text-secondary-color dark:text-dark-7">
                Connect With
              </p>
              <ul className="-mx-2 mb-12 flex justify-between">
                <li className="w-full px-2">
                  <a
                    href="/#"
                    className="flex h-11 items-center justify-center rounded-md hover:bg-opacity-90 border-2"
                  >
                    <BsGithub className="text-2xl" />
                  </a>
                </li>
                <li className="w-full px-2">
                  <a
                    href="/#"
                    className="flex h-11 items-center justify-center rounded-md bg-white hover:bg-opacity-90 border-2"
                  >
                    <FcGoogle className="text-2xl" />
                  </a>
                </li>
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
                  href="/sign-up"
                  className="hover:underline"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;