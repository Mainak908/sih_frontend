import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoWithOptions from "./UserMenu";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const user = useSelector((state) => state.auth.userData);
  const [t, i18n] = useTranslation("global");
  const lanchange = (lang) => {
    i18n.changeLanguage(lang);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Eng");
  const options = ["hi", "bn", "en"];
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    lanchange(option);
    setIsOpen(false);
  };
  return (
    <nav className=" bg-black py-4 w-full fixed">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Trashify</div>
        <ul className="flex space-x-4">
          <label
            htmlFor="lang"
            className="text-white cursor-pointer"
            onClick={toggleDropdown}
          >
            {selectedOption}
          </label>
          {isOpen && (
            <div className="absolute mt-8 w-16 bg-white border rounded-lg shadow-lg z-10">
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {option}
                </div>
              ))}
            </div>
          )}

          <li className="text-white hover:text-gray-300">
            <Link to="/">Home</Link>
          </li>
          <li className="text-white hover:text-gray-300">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="text-white hover:text-gray-300">
            <Link to="/sell">Sell</Link>
          </li>
          <li className="text-white hover:text-gray-300">
            <Link to="/redeem">Redeem</Link>
          </li>
          <li className="text-white hover:text-gray-300">
            <Link to="/About">{t("About")}</Link>
          </li>
          {user._id ? (
            <LogoWithOptions />
          ) : (
            <li className="text-white hover:text-gray-300">
              <Link to="/login">Auth</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
