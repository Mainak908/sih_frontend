import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center py-3 border-t-white bg-black text-white w-full">
      <span className=" p-2">
        <p>
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
      </span>
      <ul className="flex gap-2 mr-4">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <AiFillFacebook className="h-6 w-6 cursor-pointer" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <BsTwitter className="h-6 w-6 cursor-pointer" />
        </a>
      </ul>
    </footer>
  );
};

export default Footer;
