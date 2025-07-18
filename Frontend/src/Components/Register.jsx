import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
const Register = () => {
  const notifyRegistered = () => toast.success("Successsfully Registered.");
  const notifyExists =() => toast.error("User already exists");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post("http://localhost:4000/register", user);
      if (res.data === "exists") return notifyExists();
      console.log("success");
      setUser({
        username: "",
        email: "",
        password: "",
      });
      notifyRegistered();
    } catch (err) {
      console.log(err);
    }
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
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 bg-gray-700 rounded-md text-white placeholder-gray-400"
             value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            required
          />
          <input
            type="password"
            className="p-3 bg-gray-700 rounded-md text-white placeholder-gray-400"
            placeholder="Password"
             value={user.password}
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

        <div className="text-white mt-4">
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
