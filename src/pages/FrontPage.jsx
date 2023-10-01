import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../App";

const FrontPage = () => {
  const { user } = useContext(Context);
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
    <div>
      <h1>this is front page</h1>
      <h1>plz login</h1>
    </div>
  );
};

export default FrontPage;
