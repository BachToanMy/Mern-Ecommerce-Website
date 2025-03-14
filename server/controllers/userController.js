import userModel from "../models/userModel.js";
import validator from "validator";

const userLogin = async (req, res) => {};
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Email validation
    if (!validator.isEmail(email)) {
      return res.json({
        success: true,
        message: "Please enter a valid email address!",
      });
    }

    //Check user exist
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: true, message: "User already exists" });
    }

    //Password validation
    if (password.length < 8) {
      return res.json({
        success: true,
        message: "Password length should be equal or grater than 8",
      });
    }

    //Hashing user password

    //Register a new user
    const newUser = new userModel({
        name,
        email,
        password,
    });

    //Save user in database
    await newUser.save();

    res.json({
      success: true,
      message: "API is connected successfully! ",
    });
  } catch (error) {
    console.log("User register error: ", Error);
    res.json({ success: true, message: error?.message });
  }
};
const adminLogin = async (req, res) => {};
const removeUser = async (req, res) => {};
const updateUser = async (req, res) => {};
const getUsers = async (req, res) => {
  res.send("Hello from users");
};

export {
  userLogin,
  userRegister,
  adminLogin,
  removeUser,
  updateUser,
  getUsers,
};
