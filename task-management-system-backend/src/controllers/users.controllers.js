import { Users } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (request, response) => {
    const { username, email, password } = request.body;
    console.log(username, email, password)
    if ([username, email, password].some(field => field?.trim() === '')) {
        throw new ApiError(400, "All fields are required");
    }
    if (username && email) {
        const user = await Users.findOne({
            $or: [{ username }, { email }],
        });
        if (user) {
            throw new ApiError(400, "User already exists");
        }
    }
    const newUser = await Users.create({
        username,
        email,
        password,
    });

    response.status(201).json(new ApiResponse(201, newUser, "User created successfully"));
})

const login = asyncHandler(async (request, response) => {
    const {email, password} = request.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }
    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    const user = await Users.findOne({email: email});

    if (!user) {
        throw new ApiError(400, "Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(400, "Invalid email or password");
    }

    response.status(200).json(new ApiResponse(200, user, "User logged in successfully"));
})

export {
    registerUser,
    login,
}