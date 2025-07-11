import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post("http://localhost:4000/login", user);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 h-auto w-md p-10 rounded-xl flex flex-col gap-y-4 ">
        <h1 className="text-3xl text-white font-bold">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="p-3 bg-gray-700 rounded-md placeholder-gray-400"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          required
        />
        <input
          type="password"
          className="p-3 bg-gray-700 rounded-md placeholder-gray-400"
          placeholder="Password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          required
        />
        <button
          type="submit"
          className="p-3 bg-green-500 rounded-md text-white"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="text-white">
          <p className="inline mr-1">Don't have an account:</p>
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
