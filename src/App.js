import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/user/UserHome";
import { createContext } from "react";
import { useEffect, useState } from "react";
import ModHome from "./pages/moderator/ModHome";
import AdminHome from "./pages/admin/AdminHome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FrontPage from "./pages/FrontPage";
export const Context = createContext({ user: {} });
function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/userhome" element={<Home />} />
          <Route path="/modhome" element={<ModHome />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<FrontPage />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
