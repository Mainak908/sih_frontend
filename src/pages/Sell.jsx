import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { CgSpinner } from "react-icons/cg";

const Sell = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [address, setaddress] = useState("");
  const [public_id, setid] = useState(null);
  const [token, settoken] = useState(null);
  const [vistoken, setvistoken] = useState(false);
  const [loading, setloading] = useState(null);

  function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  }

  function useEffectAllDepsChange(fn, deps) {
    const prevDeps = usePrevious(deps);
    const changeTarget = useRef();

    useEffect(() => {
      // nothing to compare to yet
      if (changeTarget.current === undefined) {
        changeTarget.current = prevDeps;
      }

      // we're mounting, so call the callback
      if (changeTarget.current === undefined) {
        return fn();
      }

      // make sure every dependency has changed
      if (changeTarget.current.every((dep, i) => dep !== deps[i])) {
        changeTarget.current = deps;

        return fn();
      }
    }, [fn, prevDeps, deps]);
  }

  const handleset_data = () => {
    fetch("http://localhost:3001/api/v1/submit-user", {
      method: "POST",
      body: JSON.stringify({
        token,
        address,
        public_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(() => setvistoken(true))
      .then(() => setloading(false));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setloading(true);
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      // fetch("http://127.0.0.1:5000/predict", {
      //   method: "POST",
      //   body: formData,
      //   mode: "cors",
      // })
      //   .then((res) => res.json())
      //   .then((data) => console.log(data));

      formData.append("upload_preset", "f8s0xwcq");
      formData.append("cloud_name", "dddm02rvi");
      Axios.post(
        "https://api.cloudinary.com/v1_1/dddm02rvi/image/upload",
        formData
      )
        .then((res) => setid(res.data.public_id))
        .then(() =>
          settoken(Math.floor(Math.random() * (999999 - 100000)) + 100000)
        );
    }
  };

  useEffectAllDepsChange(() => {
    if (token && address && public_id) handleset_data();
  }, [token, address, public_id]);
  return (
    <div className=" flex w-full h-screen  items-center justify-center">
      <div className="max-w-md  p-4 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-4">Fill this form</h1>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Select Image
          </label>
          {selectedImage && (
            <p className="mt-2">Selected Image: {selectedImage.name}</p>
          )}
        </div>
        <input
          type="text"
          onChange={(e) => setaddress(e.target.value)}
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          value={address}
          placeholder="plz enter address"
          id="address-upload"
        />
        <button
          onClick={handleUpload}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none"
          disabled={loading}
        >
          {loading ? (
            <>
              <CgSpinner className="animate-spin h-5 w-5 mr-3" />
              <p>loading...</p>
            </>
          ) : (
            <p>upload</p>
          )}
        </button>
        {vistoken && <p>{token}</p>}
      </div>
    </div>
  );
};

export default Sell;

//https://res.cloudinary.com/dddm02rvi/image/upload/sywbearle6dvmewiopf5.png
