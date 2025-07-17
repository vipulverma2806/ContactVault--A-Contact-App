import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import NA from "./Components/NA";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const App = () => {
  // const [auth, setAuth] = useState(false);
  // axios.defaults.withCredentials = true;
  // const authentication = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:4000/auth");
  //     console.log(response);
  //     if (response.data) {
  //       setAuth(true);
  //       return console.log("okk");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   authentication();
  // }, []);
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/Dashboard"
          element={<Dashboard />}
        ></Route>
        <Route path="/NA" element={<NA />}></Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
