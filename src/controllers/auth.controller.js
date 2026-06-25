import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { tokenBlacklistModel } from "../models/blacklist.model.js";
/**
 * @name registerUserController
 * @description register a new user,expects username,email,password in the request body
 * @access public
 */
export const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username,email and password",
    });
  }
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "Account already exists with this email address or username",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "User is registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

/**
 * @name loginUserController
 * @description login as a user, expects email and password in request body
 * @access public
 */

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(403).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "User is logedIn successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

/**
 * @name logoutUserController
 * @description logout the user
 * @access public
 */
export const logoutUserController = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    const blacklistToken = await tokenBlacklistModel.create({
      token,
    });
  }
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};
