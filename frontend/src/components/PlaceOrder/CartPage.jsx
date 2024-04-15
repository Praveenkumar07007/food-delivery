import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderCard from "../PlaceOrder/OrderCard";
import headerbanner from "../../assets/hero1.png";
import OrderPrice from "../PlaceOrder/OrderPrice";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import DeliveryForm from "./DeliveryForm";

const CartPage = () => {
  const cartItems = useSelector((state) => state.food.cart);
  const address = useSelector((state) => state.order.address);
  const addressLength = JSON.stringify(address).length;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(cartItems);
  const orderHandler = () => {
    swal("Congratulations!!!", `order placed successfully`, "success");
    localStorage.removeItem("cart");
    localStorage.removeItem("address");
    dispatch(cartItems({}));
    navigate("/");
  };

  return (
    <main
      className="h-screen banner"
      style={{
        backgroundImage: `url(${headerbanner})`,
      }}>
      <div className="max-w-screen-xl py-20 mx-auto px-6">
        {cartItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
              {/* left side form  */}
              <div className="col-span-1">
                <DeliveryForm />
              </div>
              {/* right side  */}
              <div className="col-span-1">
                <div className="glass p-6 box-border rounded-lg">
                  {/* order details  */}
                  <div className="flex flex-col space-y-4 mb-3">
                    <p className="poppins text-gray-700">
                      Deliver Place :{" "}
                      <span className="font-semibold text-black">
                        {address.country ? `${address.country}` : "-----"}
                      </span>
                    </p>
                    <p className="poppins text-gray-700">
                      Road{" "}
                      <span className="font-semibold text-black">
                        {address.roadNo ? `${address.roadNo}` : "-----"}
                      </span>{" "}
                    </p>
                    <p className="poppins text-gray-700">
                      Floor :{" "}
                      <span className="font-semibold text-black">
                        {address.flatno ? `${address.flatno}` : "-----"}
                      </span>{" "}
                    </p>
                    <p className="poppins text-gray-700">
                      Deliver to :{" "}
                      <span className="font-semibold text-black">
                        {address.fullname ? `${address.fullname}` : "-----"}
                      </span>{" "}
                    </p>
                  </div>
                  {/* orders  */}

                  <div className=" flex flex-col space-y-3 h-64 overflow-y-scroll orderContainer ">
                    {cartItems.map((item) => (
                      <OrderCard key={item.id} {...item} />
                    ))}
                  </div>

                  {<OrderPrice />}

                  {/* place order button  */}
                  <div>
                    <button
                      disabled={cartItems.length === 0 || addressLength < 3}
                      className="w-full px-6 py-3 rounded-lg bg-primary text-white poppins ring-red-300 focus:ring-4 transition duration-500"
                      onClick={orderHandler}>
                      {addressLength < 3 ? "address not added" : "Place Order"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="pt-24">
            <h1 className="text-center text-5xl text-primary poppins">
              No Item has added!!
            </h1>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;
