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
    },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
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
    const { name, email, password } = req.body;

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
    if (
      email === process.env.ADMIN_EMAIL ||
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.status(200).json({
        success: true,
        token,
        message: "Login successfully",
      });
    } else {
      res.status(402).json({
        success: false,
        message: "Invalid credentials",
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
    const { _id, name, email, password } = req.body;
    const user = await userModel.findById(_id);
    if (!user) {
      res.status(401).json({
        success: false,
        message: "User was not found",
      });
    } else {
      if (name) user.name = name;
      if (email) {
        if (!validator.isEmail(email)) {
          return res.status(400).json({
            success: false,
            message: "Please enter a valid email address",
          });
        }
        user.email = email;
      }
      if (password) {
        if (password.length < 8) {
          return res.status(401).json({
            success: true,
            message: "Password length should be equal or grater than 8",
          });
        }
        const salt = bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, genSalt);
      }
      await user.save();
      res.json({
        success: true,
        message: "User was updated successfully",
      });
    }
  } catch (error) {
    console.error("Update user's information false: ", error);
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
      success:true,
      Total_user: total,
      List: users,
    })
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
