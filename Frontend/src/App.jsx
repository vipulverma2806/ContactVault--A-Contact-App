import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Dashboard from "../Components/Dashboard";
const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
};

export default App;
