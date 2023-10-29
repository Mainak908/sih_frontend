import React from "react";

const Popups = ({ trigger, children }) => {
  return trigger ? <div>{children}</div> : "";
};

export default Popups;
