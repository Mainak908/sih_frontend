import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";

const AdminHome = () => {
  const user = useSelector((state) => state.auth.userData);
  if (!user._id) return <Navigate to="/login" />;
  return (
    <>
      <Navbar />
      <div>
        <h1>this is Admin Home page</h1>
      </div>
    </>
  );
};

export default AdminHome;
