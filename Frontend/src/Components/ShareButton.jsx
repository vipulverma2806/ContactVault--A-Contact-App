import React, { useState } from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
  FaShareAlt,
  FaTelegram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ShareButton = ({ data,deleteContact,editContact }) => {
  const [showOptions, setShowOptions] = useState(false);

  const name = data.name;
  const phone = data.phoneNo;

  const email = data.email;

  const message = encodeURIComponent(
    `Name : ${name} \nPhone: ${phone} \nEmail: ${email}`
  );

  return (
    <div className="relative flex justify-between w-full mt-5">
      {/*---------------------- Main Share Button-------------------------------------- */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="bg-blue-900 text-white p-3 rounded-full hover:bg-blue-700 transition mt-2"
      >
        <FaShareAlt />
      </button>
      <button
        onClick={editContact}
        className="bg-yellow-900 text-white p-3 rounded-full hover:bg-yellow-700 transition mt-2"
      >
        <FaEdit />
      </button>
      <button
        onClick={deleteContact}
        className="bg-red-900 text-white p-3 rounded-full hover:bg-red-700 transition mt-2"
      >
        <MdDelete />
      </button>

      {/* ----------------------Social Share Options -----------------------------------*/}
      {showOptions && (
        <div className="absolute top-12   bg-white shadow-lg rounded-xl p-3 space-x-3 flex flex-col z-50 ">
          <a
            href={`https://web.whatsapp.com/send?text=${message}`}
            target="_blank"
            className="text-green-500 hover:text-green-700 flex "
          >
            <FaWhatsapp size={24} className="mr-2" /> Whatsapp
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
            <FaTelegram size={24} className="mr-2" /> Telegram
          </a>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
