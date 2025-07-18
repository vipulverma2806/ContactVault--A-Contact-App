import React from "react";
import axios from "axios";
import ShareButton from "./ShareButton";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const notifyContact = () => toast.success("Contact added successsfully");
  const notifyLogout = () => toast.info("Successsfully Logged out.");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);
  const [editId,setEditId] = useState();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phoneNo: "",
    address: "",
    notes: "",
  });
  const fetchContact = async () => {
    try {
      const res = await axios.get("http://localhost:4000/getContacts");
      if (res.data === "NA") return navigate("/NA");

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post("http://localhost:4000/logout");
      console.log(res);
      navigate("/");
      notifyLogout();
    } catch (err) {
      console.log(err);
    }
  };

  // --------------------------add contact------------------
  const addContact = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/addContact", contact);
      console.log(res);
      setContact({
        name: "",
        email: "",
        phoneNo: "",
        address: "",
        notes: "",
      });
      fetchContact();
      notifyContact();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  //---------------------delete------------------
  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/deleteContact/${id}`
      );
      console.log(res.data);
      fetchContact();
    } catch (err) {
      console.log(err);
    }
  };
  //---------------------edit------------------------
  const editContact = async (data) => {
    setContact({
      name: data.name,
      email: data.email,
      phoneNo: data.phoneNo,
      address: data.address,
      notes: data.notes,
    });
    setEditId(data._id);
    window.scrollTo({
      top: 0,
      behavior:'smooth'
    })
  };

  //------------------editAPI----------
  const editApi = async () => {
    try {
      const res = await axios.put(`http://localhost:4000/editContact/${editId}`,contact);
      console.log(res.data);
      fetchContact();
      setEditId('');
      setContact({
        name: "",
        email: "",
        phoneNo: "",
        address: "",
        notes: "",
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col p-7">
      <div className="bg-gray-800 h-1/3 w-full p-10 rounded-xl  ">
        <div className="flex flex-row justify-between  mb-4">
          {" "}
          <h1 className="text-3xl inline text-white font-bold col-span-2">
            Add contacts
          </h1>
          <button
            onClick={logout}
            className="bg-red-700 rounded-md w-25 text-gray-200 font-bold hover:bg-red-900"
          >
            Logout
          </button>
        </div>
        <form
          onSubmit={editId ? editApi: addContact}
          className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2"
        >
          <input
            type="name"
            placeholder="Name"
            className="p-3 w-full bg-gray-700 text-gray-100 rounded-md placeholder-gray-400 "
            value={contact.name}
            onChange={(e) => {
              setContact({ ...contact, name: e.target.value });
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => {
              setContact({ ...contact, email: e.target.value });
            }}
            required
            className="p-3 w-full bg-gray-700 rounded-md text-gray-100 placeholder-gray-400"
          />
          <input
            type="number"
            value={contact.phoneNo}
            onChange={(e) => {
              setContact({ ...contact, phoneNo: e.target.value });
            }}
            required
            className="p-3 w-full bg-gray-700 rounded-md text-gray-100 placeholder-gray-400"
            placeholder="Phone no."
          />
          <input
            type="text"
            value={contact.address}
            onChange={(e) => {
              setContact({ ...contact, address: e.target.value });
            }}
            required
            className="p-3 w-full bg-gray-700 rounded-md text-gray-100 placeholder-gray-400"
            placeholder="Address"
          />
          <input
            type="text"
            value={contact.notes}
            onChange={(e) => {
              setContact({ ...contact, notes: e.target.value });
            }}
            required
            className="p-3 w-full bg-gray-700 rounded-md text-gray-100 placeholder-gray-400 "
            placeholder="Notes"
          />
          <button
            type="submit"
            className="p-3 w-full bg-green-500 rounded-md text-white hover:bg-green-700"
          >
           {editId ? "Edit" :"Add" }
          </button>
        </form>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-7 mt-7">
        {data.map((data , i) => {
          return (
            <div key={i} className="bg-gray-800 p-10 rounded-xl">
              <h4 className="text-3xl font-bold text-white">{data.name}</h4>
              <div className="font-semibold text-gray-300">{data.email}</div>
              <div className="font-semibold text-gray-300">{data.phoneNo}</div>
              <div className="font-semibold text-gray-300">{data.address}</div>
              <div className="font-semibold text-gray-300">{data.notes}</div>
              <div className="flex justify-between">
                <ShareButton
                  data={data}
                  deleteContact={() => deleteContact(data._id)}
                  editContact={() => editContact(data)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
