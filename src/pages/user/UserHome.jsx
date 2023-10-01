import React, { useContext } from "react";
import Usegeolocation from "../../Hooks/Usegeolocation";
import { useTranslation } from "react-i18next";
import { Context } from "../../App";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(Context);
  const location = Usegeolocation();
  const [t, i18n] = useTranslation("global");
  const lanchange = (lang) => {
    i18n.changeLanguage(lang);
  };
  if (!user._id) return <Navigate to="/login" />;
  return (
    <div>
      <h1 className=" text-red-200">this is user home page</h1>
      {location.loaded ? JSON.stringify(location) : "location is not available"}
      <p>{t("welcome")}</p>
      <div className=" flex gap-3">
        <button className=" bg-blue-600" onClick={() => lanchange("en")}>
          en
        </button>
        <button className=" bg-blue-600" onClick={() => lanchange("hi")}>
          hindi
        </button>
      </div>
    </div>
  );
};

export default Home;
