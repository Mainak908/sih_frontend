import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
const ModHome = () => {
  const [data, setdata] = useState([]);
  const [userinput, setuserinput] = useState(null);

  const user = useSelector((state) => state.auth.userData);
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/get-all-subuser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((d) =>
        d.resp.map((pd) =>
          setdata((prevdata) => [
            ...prevdata,
            { token: pd.token, address: pd.address },
          ])
        )
      );
  }, []);
  if (!user._id) return <Navigate to="/login" />;

  const submithandler = (databasetoken) => {
    if (databasetoken !== parseInt(userinput)) {
      // console.log("token not matched");
      // console.log(databasetoken, userinput);
      return;
    }
    fetch("http://localhost:3001/api/v1/delete-subuser", {
      method: "DELETE",
      body: JSON.stringify({
        token: userinput,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log(data.resp))
      .then(window.location.reload());
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen w-full">
        {data.map((pdata, key) => (
          <div className="bg-white shadow-md rounded-lg p-4 " key={key}>
            <label
              htmlFor="inputField"
              className="block text-sm font-medium text-gray-700"
            >
              {pdata.address}
            </label>
            <input
              type="text"
              id="inputField"
              className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your text"
              onChange={(e) => setuserinput(e.target.value)}
            />
            <button
              onClick={(e) => submithandler(pdata.token)}
              className=" p-1 bg-slate-600 text-white"
            >
              auth
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ModHome;
