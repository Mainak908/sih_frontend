import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authenticate";
import { Link } from "react-router-dom";
import { FcBusinessman } from "react-icons/fc";

const LogoWithOptions = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };
  const logoutuser = async () => {
    const res = await fetch("http://localhost:3001/api/v1/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    data.success ? dispatch(logout()) : console.log("some error");
  };

  return (
    <div className="">
      <div className={`cursor-pointer text-center `} onClick={toggleOptions}>
        {/* <img src="logo512.png" alt="Logo"  /> */}
        <FcBusinessman className="w-6 h-6" />
      </div>
      {isOptionsOpen && (
        <div className="absolute mt-8 w-16 bg-white border rounded-lg shadow-lg z-10">
          <ul>
            <div
              className=" cursor-pointer hover:text-gray-300"
              onClick={logoutuser}
            >
              Logout
            </div>
            <li className=" cursor-pointer hover:text-gray-300">
              <Link to="/userdetails">info</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LogoWithOptions;
