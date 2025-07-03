import React, { useState } from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
  FaShareAlt,
  FaTelegram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ShareButton = ({data}) => {
  const [showOptions, setShowOptions] = useState(false);

  const name = data.name;
  const phone = data.phoneNo;
  const addr = data.address;
  const email = data.email;

  const shareUrl = "https://yourapp.com"; // Replace with your link

  return (
    <div className="relative inline-block">
      {/*---------------------- Main Share Button-------------------------------------- */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
      >
        <FaShareAlt />
      </button>

      {/* ----------------------Social Share Options -----------------------------------*/}
      {showOptions && (
        <div className="absolute top-12   bg-white shadow-lg rounded-xl p-3 space-x-3 flex flex-col z-50 ">
          <a
            href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
           
            className="text-green-500 hover:text-green-700 flex "
          >
            <FaWhatsapp size={24} /> Whatsapp 
          </a>
          <a href="" className="text-gray-500 hover:text-gray-700 flex ">
            <FaXTwitter size={24}/> X
          </a>
          <a href="" className="text-blue-500 hover:text-blue-700 flex ">
            <FaTelegram size={24}/> Telegram
          </a>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
