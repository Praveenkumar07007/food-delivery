import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.png";
import { logout } from "../../redux/features/auth/authSlice";
import axios from "axios";
import { BsCart2 } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";

const Header = () => {
  const [changeHeader, setChangeHeader] = useState(false);
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const cartQty = useSelector((state) => state.food.cartQty);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await axios.get("/api/v1/users/logout").then(() => {
      dispatch(logout());
      alert("Logout Successfully");
    });
  };
  //header change function
  const onChangeHeader = () => {
    if (window.scrollY >= 50) {
      setChangeHeader(true);
    } else {
      setChangeHeader(false);
    }
  };
  //change header by scrolling
  window.addEventListener("scroll", onChangeHeader);
  return (
    <header
      className={
        changeHeader
          ? "bg-white fixed z-50 top-0 left-0 w-full shadow-md transition duration-500"
          : "bg-transparent fixed z-50 top-0 left-0 w-full transition duration-500"
      }>
      <nav className="flex items-center max-w-screen-xl mx-auto px-6 py-3">
        {/* left  */}
        <div className="flex flex-grow">
          <img
            className="w-36 cursor-pointer"
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        {/* right  */}
        {authStatus ? (
          <>
            <div className="flex items-center justify-end space-x-4">
              <div
                className="relative flex cursor-pointer"
                onClick={() => navigate("/cart")}>
                <span className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white poppins absolute -right-2 -top-2">
                  {cartQty}
                </span>
                <BsCart2 className="cursor-pointer w-6 h-6 text-gray-700" />
              </div>

              <p className="text-gray-700 poppins hidden md:block lg:block">
                {userData.fullname}
              </p>
              <FiLogOut
                className="cursor-pointer w-6 h-6 text-gray-700"
                onClick={logoutHandler}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-end space-x-6">
              <button className="poppins" onClick={() => navigate("/signin")}>
                Sign In
              </button>
              <button
                className=" bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
                onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
