import React from "react";
import { Link } from "react-router-dom";
const NA = () => {
  return (
    <div className="flex items-center justify-center bg-gray-900 min-h-screen text-gray-300 font-bold text-3xl">
      <span>
        You are not Authorised. Please {"   "}
        <Link to="/" className="hover:text-blue-600 hover:underline">Login</Link>
      </span>
    </div>
  );
};

export default NA;
