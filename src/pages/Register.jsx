import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { Context } from "../App";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://sih-backend-3vgz.onrender.com/api/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };

  if (user) return <Navigate to="/userhome" />;

  return (
    <div className="login">
      <section>
        <form onSubmit={registerHandler}>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter Password"
          />
          <button type="submit">Sign Up</button>
          {/* <p>OR</p> */}
          {/* <Link href={"/login"}>Log In</Link> */}
        </form>
      </section>
    </div>
  );
};

export default Register;
