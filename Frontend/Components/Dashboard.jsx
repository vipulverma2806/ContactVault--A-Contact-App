import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import ShareButton from "./ShareButton";
const Dashboard = () => {
  const dummy = [
    {
      name: "vifyj",
      email: "dgjtyjngs",
      phoneNo: "3542ytj6",
      address: "iurvtyjth ebthoui",
      notes: "irutyytjwe",
    },
    {
      name: "yjvi",
      email: "dgjntyjgs",
      phoneNo: "354yj26",
      address: "iuryjtvth ebthoui",
      notes: "irutytjywe",
    },
    {
      name: "vsri",
      email: "dgjngseys",
      phoneNo: "35yuk426",
      address: "iuregrvth ebthoui",
      notes: "iryjdfutywe",
    },
    {
      name: "vetai",
      email: "dgjrengs",
      phoneNo: "3542yjre6",
      address: "iurvth ebjdgthoui",
      notes: "irutdrgywe",
    },
    {
      name: "viewat",
      email: "dgjngrhsss",
      phoneNo: "3542hs6",
      address: "iurvthreh ebthoui",
      notes: "irurgdtywe",
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col p-7">
      <div className="bg-gray-800 h-1/3 w-full p-10 rounded-xl grid grid-cols-2 gap-y-4 ">
        <h1 className="text-3xl text-white font-bold col-span-2">
          Add contacts
        </h1>
        <input
          type="name"
          placeholder="Name"
          className="p-3 bg-gray-700 rounded-md placeholder-gray-400 mr-6"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 bg-gray-700 rounded-md placeholder-gray-400"
        />
        <input
          type="number"
          className="p-3 bg-gray-700 rounded-md placeholder-gray-400 mr-6"
          placeholder="Phone no."
        />
        <input
          type="text"
          className="p-3 bg-gray-700 rounded-md placeholder-gray-400"
          placeholder="Address"
        />
        <input
          type="text"
          className="p-3 bg-gray-700 rounded-md placeholder-gray-400 mr-6"
          placeholder="Notes"
        />
        <button
          type="text"
          className="p-3 bg-green-500 rounded-md text-white hover:bg-green-700"
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-7 mt-7">
        {dummy.map((data) => {
          return (
            <div className="bg-gray-800 p-10 rounded-xl">
              <h4 className="text-3xl font-bold text-white">{data.name}</h4>
              <div className="font-semibold text-gray-300">{data.email}</div>
              <div className="font-semibold text-gray-300">{data.phoneNo}</div>
              <div className="font-semibold text-gray-300">{data.address}</div>
              <div className="font-semibold text-gray-300">{data.notes}</div>
              <ShareButton data={data}/>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default Dashboard;
