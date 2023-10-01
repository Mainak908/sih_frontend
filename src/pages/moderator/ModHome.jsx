import React, { useContext } from "react";
import { Context } from "../../App";
import { Navigate } from "react-router-dom";

const ModHome = () => {
  const { user, setUser } = useContext(Context);
  if (!user._id) return <Navigate to="/login" />;
  return (
    <div>
      <h1>This is Moderator Home page</h1>
    </div>
  );
};

export default ModHome;
