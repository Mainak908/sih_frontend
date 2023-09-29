import { useEffect, useState } from "react";

const Usegeolocation = () => {
  const [location, setlocation] = useState({
    loaded: false,
    Coordinates: { lat: " ", lng: "" },
  });

  const onSuccess = (location) => {
    setlocation({
      loaded: true,
      Coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setlocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  return location;
};

export default Usegeolocation;
