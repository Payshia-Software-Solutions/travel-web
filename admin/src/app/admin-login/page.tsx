"use client";
import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex">
      <div className="left-div w-[50%] bg-[#f8f8f8] h-dvh">
        <img src="/images/Logo.png" className="w-[30%] mt-5 ml-5" alt="" />
      </div>
      <div className="right-div w-[50%] max-w-md mx-auto mt-[10rem]">
        <div>
          <h1 className="text-3xl font-medium mb-6">Sign In</h1>
          <form className="">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#06377b] peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type={showPassword ? "text" : "password"}
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#06377b] peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
              {showPassword ? (
                <IoMdEyeOff
                  className="absolute top-3 right-4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoMdEye
                  className="absolute top-3 right-4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <div className="flex justify-between">
              <div className="flex text-sm cursor-pointer">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="mr-2 accent-[#06377b]"
                />
                <label htmlFor="remember-me">Remember Me</label>
              </div>
              <h5 className="text-sm cursor-pointer">Forget Password ?</h5>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-[2.5rem] py-3 mt-[3rem] bg-[#06377b] text-white text-lg font-medium"
              >
                Sign In
              </button>
            </div>
          </form>
          {/* <div className="flex items-center justify-center space-x-4 mt-5">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-gray-600 text-xs">Or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div> */}
          <p className="text-xs mt-6 text-[#84818A]">
            Protected by reCAPTCHA and subject to the <span className="text-[#06377b]">Cuboid Privacy Policy</span> and
            <span className="text-[#06377b]"> Terms of Ser vice</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
