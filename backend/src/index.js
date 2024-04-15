import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

// console.log(process.env.RAZORPAY_API_KEY);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 6401, () => {
      console.log(`Server is running on port ${process.env.PORT || 6401}`);
    });
  })
  .catch((error) => {
    console.log("mongoDB connection failed !!!", error);
  });
