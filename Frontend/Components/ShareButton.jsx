import React, { useState } from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
  FaShareAlt,
  FaTelegram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ShareButton = ({ data }) => {
  const [showOptions, setShowOptions] = useState(false);

  const name = data.name;
  const phone = data.phoneNo;
  const addr = data.address;
  const email = data.email;

  const message = encodeURIComponent(
    `Name : ${name} \nPhone: ${phone} \nEmail: ${email}`
  );
  const shareUrl = "https://yourapp.com"; // Replace with your link

  return (
    <div className="relative inline-block">
      {/*---------------------- Main Share Button-------------------------------------- */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition mt-2"
      >
        <FaShareAlt />
      </button>

      {/* ----------------------Social Share Options -----------------------------------*/}
      {showOptions && (
        <div className="absolute top-12   bg-white shadow-lg rounded-xl p-3 space-x-3 flex flex-col z-50 ">
          <a
            href={`https://web.whatsapp.com/send?text=${message}`}
            target="_blank"
            className="text-green-500 hover:text-green-700 flex "
          >
            <FaWhatsapp size={24} className="mr-2"/> Whatsapp
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${message}`}
            target="_blank"
            className="text-gray-500 hover:text-gray-700 flex "
          >
            <FaXTwitter size={24} className="mr-2" /> Twitter (X)
          </a>
          <a
            
            href={`https://t.me/share/url?url=%20&text=${message}`}
            target="_blank"
            className="text-blue-500 hover:text-blue-700 flex "
          >
            <FaTelegram size={24} className="mr-2"/> Telegram
          </a>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
