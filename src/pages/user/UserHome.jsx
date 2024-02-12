import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Usegeolocation from "../../Hooks/Usegeolocation";
import ChattBot from "../../components/Chattbot";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

const AnyReactComponent = () => (
  <div>
    <img src="pin2.jpg" alt="img" className=" w-9 h-12"></img>
  </div>
);

const Home = () => {
  const [loc, setloc] = useState({});
  const [nerloc, setnerloc] = useState([]);
  const [vis, setvis] = useState(false);
  const location = Usegeolocation();
  // const [t] = useTranslation("global");

  useEffect(() => {
    location.loaded ? setloc(location.Coordinates) : setloc({});
  }, [location]);
  const user = useSelector((state) => state.auth.userData);
  if (!user._id) return <Navigate to="/login" />;

  const defaultProps = {
    center: {
      lat: 22.99835602,
      lng: 88.01502627,
    },
    zoom: 11,
  };

  const fetchloc = () => {
    fetch("http://localhost:3001/api/v1/find-nearest-store", {
      method: "POST",
      body: JSON.stringify({
        lat: loc.lat,
        long: loc.lng,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) =>
        data.data.map((d) =>
          setnerloc((prev) => [
            ...prev,
            { lng: d.location.coordinates[0], lat: d.location.coordinates[1] },
          ])
        )
      )
      .then(setvis(!vis));
  };

  return (
    <>
      <Navbar />
      <div className=" bg-[url('../public/e1.jpg')] h-screen w-full object-cover bg-no-repeat bg-cover">
        <div className=" w-full h-full bg-opacity-50 bg-black">
          <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
            <h1 className=" text-white">Welcome To Trashify</h1>
            <p className=" text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <button
              onClick={() => fetchloc()}
              className=" bg-blue-600 text-white px-3 py-2"
            >
              Locator
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        {vis && (
          <div className=" w-96 h-56">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "",
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              {nerloc.map((l, key) => (
                <AnyReactComponent key={key} lat={l.lat} lng={l.lng} />
              ))}
            </GoogleMapReact>
          </div>
        )}
        {vis &&
          nerloc.map((l, key) => (
            <p className=" text-black" key={key}>
              {l.lat} {l.lng}
            </p>
          ))}
      </div>

      {/* <div className="">
          <div className=" absolute bottom-6 right-6">
            <div className=" flex flex-col w-72 h-80 opacity-100 z-50 transition-all duration-500 ease-in-out">
              <div className="flex items-center justify-center px-4 rounded-t-2xl">
                <div className=" mr-3">
                  <img
                    src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
                    alt=""
                  />
                  Name
                </div>
                <div className="chatbox__content--header">
                  <h4 className=" text-lg">Chat support</h4>
                  <p className="chatbox__description--header">
                    Hi. My name is Sam. How can I help you?
                  </p>
                </div>
              </div>
              <div className="chatbox__messages">
                <div></div>
              </div>
              <div className="chatbox__footer">
                <input
                  type="text"
                  id="chatinput"
                  placeholder="Write a message..."
                />
                <button className="chatbox__send--footer send__button">
                  Send
                </button>
              </div>
            </div>
            <div className="chatbox__button">
              <button>
                <img src="./images/chatbox-icon.svg" alt="" />
              </button>
            </div>
          </div>
        </div>  */}
      <ChattBot />
      <Footer />
    </>
  );
};

export default Home;
