import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/slices/authenticate";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        credentials: "include",
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      dispatch(login({ userData: data.user }));
      toast.success(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register your account
          </h2>
        </div>

        <form
          className="mt-8 space-y-6"
          id="register"
          onSubmit={registerHandler}
        >
          <input type="hidden" name="remember" value="true" />

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter Name"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter Email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
          {/* <p>OR</p> */}
          {/* <Link href={"/login"}>Log In</Link> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
