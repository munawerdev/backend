import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user_model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatar = req.files.avatar[0].path;
  const coverImage = req.files.coverImage[0].path;

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatarUrl = await uploadOnCloudinary(avatar);
  const coverImageUrl = await uploadOnCloudinary(coverImage);

  if (!avatarUrl) {
    throw new ApiError(400, "Failed to upload avatar");
  }
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatarUrl.url,
    coverImage: coverImageUrl?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
