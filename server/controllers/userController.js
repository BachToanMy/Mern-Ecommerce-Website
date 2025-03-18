import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "864000" }
  );
};

/////LOGIN/////////////////////////////////////////////////////////////////
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials, try agian",
      });
    }
    const token = createToken(user);
    res.status(200).json({
      success: true,
      token,
      message: "Login successfully",
    });
  } catch (error) {
    console.error("User login error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/////REGISTER//////////////////////////////////////////////////////////////
const userRegister = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    //request body verification
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    //Email validation
    if (!validator.isEmail(email)) {
      return res.status(401).json({
        success: true,
        message: "Please enter a valid email address",
      });
    }

    //Check user exist
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(402)
        .json({ success: true, message: "User already exists" });
    }

    //Password validation
    if (password.length < 8) {
      return res.status(401).json({
        success: true,
        message: "Password length should be equal or grater than 8",
      });
    }

    //Hashing user password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    //Register a new user
    const newUser = new userModel({
      name,
      email,
      password: encryptedPassword,
      isAdmin,
    });

    //Save user in database
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("User register error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/////ADMIN LOGIN///////////////////////////////////////////////////////////
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    if (!user?.isAdmin) {
      return res.status(402).json({
        success: false,
        message: "You are not authorized to login.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch && user?.isAdmin) {
      const token = jwt.sign(
        email + password + user?.isAdmin,
        process.env.JWT_SECRET
      );
      res.status(200).json({
        success: true,
        token,
        message: "Admin logged successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials, try agian",
      });
    }
  } catch (error) {
    console.error("Admin login error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/////REMOVE USER/////////////////////////////////////////////////////////////////////
const removeUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.body._id);
    res.status(200).json({
      success: true,
      message: "User was deleted successfully",
    });
  } catch (error) {
    console.error("Remove user false: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
/////UPDATE USER///////////////////////////////////////////////////////////////////////
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Kiểm tra user có tồn tại không
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User was not found",
      });
    }

    // Cập nhật name nếu có
    if (name) user.name = name;

    // Kiểm tra và cập nhật email nếu có thay đổi
    if (email) {
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address",
        });
      }
      
      // Kiểm tra xem email đã được sử dụng chưa
      const existingUser = await userModel.findOne({ email });
      if (existingUser && existingUser.id !== id) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use",
        });
      }

      user.email = email;
    }

    // Kiểm tra và cập nhật password nếu có
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password length should be at least 8 characters",
        });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Lưu lại user đã cập nhật
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User was updated successfully",
    });
  } catch (error) {
    console.error("Update user's information failed: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/////GET USERS/////////////////////////////////////////////////////////////
const getUsers = async (req, res) => {
  try {
    const total = await userModel.countDocuments({});
    const users = await userModel.find({});
    res.json({
      success: true,
      total: total,
      users: users,
    });
  } catch (error) {
    console.error("Get all users false: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  userLogin,
  userRegister,
  adminLogin,
  removeUser,
  updateUser,
  getUsers,
};
