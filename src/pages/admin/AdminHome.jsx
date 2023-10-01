import React, { useContext } from "react";
import { Context } from "../../App";
import { Navigate } from "react-router-dom";

const AdminHome = () => {
  const { user } = useContext(Context);
  if (!user._id) return <Navigate to="/login" />;
  return (
    <div>
      <h1>this is Admin Home page</h1>
    </div>
  );
};

export default AdminHome;
