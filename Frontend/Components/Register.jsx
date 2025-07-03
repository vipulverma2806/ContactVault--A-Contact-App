import React from "react";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 h-auto w-md p-10 rounded-xl flex flex-col gap-y-4 ">
        <h1 className="text-3xl text-white font-bold">Register</h1>
        <input
          type="name"
          placeholder="Name"
          className="p-3 bg-gray-700 rounded-md placeholder-gray-400"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 bg-gray-700 rounded-md placeholder-gray-400"
        />
        <input
          type="password"
          className="p-3 bg-gray-700 rounded-md placeholder-gray-400"
          placeholder="Password"
        />
        <button
          type="submit"
          className="p-3 bg-green-500 rounded-md text-white"
        >
          Submit
        </button>
        <div className="text-white">
          <p className="inline mr-1">Already have an account:</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
