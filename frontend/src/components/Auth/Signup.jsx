import React, { useState } from "react";
import logo from "../../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const createAccount = async (data) => {
    setError("");
    try {
      const userData = await axios.post("/api/v1/users/register", data);
      if (userData) {
        // alert("Account created Successfully");
         swal(
           "Information Updated!",
           "Account created Successfully!",
           "success"
         );
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <main className="h-screen w-full banner">
      <div className="flex flex-col justify-center items-center h-screen">
        {/* logo  */}
        <div>
          <img className="w-52" src={logo} alt="logo" />
        </div>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {/* sign up form  */}
        <form
          onSubmit={handleSubmit(createAccount)}
          className="bg-white w-96 mt-6 p-4 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
              {...register("fullname", {
                required: true,
              })}
            />{" "}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />{" "}
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
              {...register("password", {
                required: true,
              })}
            />
          </div>
          <button className="w-full py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins ">
            Sign Up
          </button>
          <Link to="/signin">
            <p className="text-base text-primary text-center my-6 hover:underline">
              Already have an account ?
            </p>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default Signup;
