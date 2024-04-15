import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponseHandler.js";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (id) => {
  try {
    const user = await User.findById(id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiErrors(400, "Something went wrong while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!(fullname && email && password)) {
    throw new ApiErrors(400, "All fields are required");
  }
  const existedUser = await User.findOne({ email: email });
  if (existedUser) {
    throw new ApiErrors(400, "Username or email already exists");
  }
  const user = await User.create({
    fullname,
    email: email.toLowerCase(),
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiErrors(400, "Something went wrong while creating user");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, option)
    .cookie("accessToken", accessToken, option)
    .json(
      new ApiResponse(
        201,
        {
          createdUser,
          accessToken,
        },
        "User created successfully"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiErrors(400, "email is required");
  }

  if (!password) {
    throw new ApiErrors(400, "Password is required");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json(new ApiResponse(400, {}, "User not found"));
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  //console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    //throw new ApiErrors(400, "Password is not correct")
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Password is not correct"));
  }
  console.log("7");
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  console.log("8");
  const logedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  console.log("9");
  const option = {
    httpOnly: true,
  };
  console.log("1");
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, option)
    .cookie("accessToken", accessToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: logedInUser,
          accessToken,
        },
        "User loged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: "",
      },
    },
    {
      new: true,
    }
  );

  const option = {
    httpOnly: true,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", option)
    .clearCookie("accessToken", option)
    .json(new ApiResponse(200, {}, "User loged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incommingUserId = req.body.userId;
  // console.log(req.body);
  if (!incommingUserId) {
    throw new ApiErrors(400, "id is required");
  }

  const user = await User.findById(incommingUserId);

  if (!user) {
    throw new ApiErrors(404, "User not found");
  }

  const incomingRefreshToken = user.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiErrors(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiErrors(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiErrors(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiErrors(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  //console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    throw new ApiErrors(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, username, email, phone } = req.body;

  if (!(fullname || email || phone || username)) {
    throw new ApiErrors(400, "Any one field is required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        phone,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const getUserById = asyncHandler(async (req, res) => {
  const id = req.params._id;

  if (!id) {
    throw new ApiErrors(400, "Id is required");
  }

  const user = await User.findById(id).select("-password -refreshToken");

  if (!user) {
    throw new ApiErrors(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  generateAccessAndRefreshToken,
  getUserById,
};
