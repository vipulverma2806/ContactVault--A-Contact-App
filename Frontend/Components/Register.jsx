import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(user);
  await axios.post("http://localhost:5000/register",user)


  };

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 h-auto w-md p-10 rounded-xl  ">
        <h1 className="text-3xl mb-4 text-white font-bold">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <input
            type="name"
            placeholder="Name"
            className="p-3 bg-gray-700 rounded-md text-white placeholder-gray-400"
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 bg-gray-700 rounded-md text-white placeholder-gray-400"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            required
          />
          <input
            type="password"
            className="p-3 bg-gray-700 rounded-md text-white placeholder-gray-400"
            placeholder="Password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            required
          />
          <button
            type="submit"
            className="p-3 bg-green-500 rounded-md text-white"
           
          >
            Submit
          </button>
        </form>

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
