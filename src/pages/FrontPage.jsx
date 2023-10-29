import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FrontPage = () => {
  const user = useSelector((state) => state.auth.userData);
  if (user._id) {
    if (user.role === "nuser") {
      return <Navigate to="/userhome" />;
    }
    if (user.role === "mod") {
      return <Navigate to="/modhome" />;
    }
    if (user.role === "admin") {
      return <Navigate to="/adminhome" />;
    }
  }
  return (
    <div className=" bg-[url('../public/e1.jpg')] h-screen w-full object-cover bg-no-repeat bg-cover">
      <div className=" w-full h-full bg-opacity-50 bg-black">
        <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
          <h1 className=" text-white">Welcome To Trashify</h1>
          <Link to="/login" className=" px-3 py-2 bg-green-400">
            Login
          </Link>
          <p className="text-white">OR</p>
          <Link to="/signup" className=" px-3 py-2 bg-green-400">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
