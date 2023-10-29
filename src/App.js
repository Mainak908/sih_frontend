import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/user/UserHome";
import ModHome from "./pages/moderator/ModHome";
import AdminHome from "./pages/admin/AdminHome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FrontPage from "./pages/FrontPage";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/slices/authenticate";
import About from "./pages/About";
import Sell from "./pages/Sell";
import Shop from "./pages/Shop";
import Location from "./pages/Location";
import SingleP from "./pages/SingleP";
import CartPage from "./pages/Cart";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success)
          dispatch(
            login({ userData: data.user })
          ); //initial state is object,data.user is object
        else dispatch(logout());
      });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/userhome" element={<Home />} />
        <Route path="/modhome" element={<ModHome />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<FrontPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/location" element={<Location />} />
        <Route path="/shop/:productId" element={<SingleP />} />
        <Route path="/cartpage" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
