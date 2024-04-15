import { createBrowserRouter } from "react-router-dom";
// ++++++++++++++++++++++++++++++++++++++++++++
import App from "./App";
import HomePage from "./components/pages/HomePage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import AuthLayout from "./components/Auth/AuthLayout";
import FoodDetails from "./components/Foods/FoodDetails";
import CartPage from "./components/PlaceOrder/CartPage";

// ################ Router ###################

// ++++++++++++++++++++++++++++++++++++++++++

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "item-details",
        element: <FoodDetails />,
      },
      {
        path: "/signin",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },

      {
        path: "/cart",
        element: (
          <AuthLayout authentication>
            <CartPage />
          </AuthLayout>
        ),
      },
    ],
  },
]);

export default router;
