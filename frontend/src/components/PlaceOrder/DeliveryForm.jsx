import React, { useState } from "react";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateAddress } from "../../redux/features/product/orderSlice";

const DeliveryForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  
  const address = async (data) => {
    localStorage.setItem("address", JSON.stringify(data));
    dispatch(updateAddress(data));

    swal(
      "Information Updated!",
      "Your shipping details updated successfully!",
      "success"
    );
  };
  return (
    <div className="flex flex-col mt-20">
      <h1 className="text-2xl poppins pb-4 border-b border-gray-500 text-gray-700">
        Edit Delivery Details
      </h1>
      <form className="my-4" onSubmit={handleSubmit(address)}>
        <div className="flex flex-col space-y-3">
          <input
            className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
            type="text"
            placeholder="Country and District"
            {...register("country", {
              required: true,
            })}
          />
          <input
            className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
            type="text"
            placeholder="Road Name and Road No"
            name="roadNo"
            {...register("roadNo", {
              required: true,
            })}
          />
          <input
            className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
            type="text"
            placeholder="Flat, suite or floor"
            name="flatno"
            {...register("flatno", {
              required: true,
            })}
          />
          <input
            className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
            type="text"
            placeholder="Delivery to"
            {...register("fullname", {
              required: true,
            })}
          />
          <button className="w-full px-6 py-3 rounded-lg bg-primary text-white poppins ring-red-300 focus:ring-4 transition duration-500">
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;
