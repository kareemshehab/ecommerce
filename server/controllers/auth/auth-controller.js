const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });

    const usernameExists = await User.findOne({ userName });

    if (emailExists || usernameExists) {
      const message =
        emailExists && usernameExists
          ? "Both email and username already exist"
          : emailExists
          ? "Email already exists"
          : "Username already exists";

      return res.json({
        success: false,
        message,
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// -----------------------------------------------------
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User not found please register",
      });
    }
    checkPasswordMathes = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMathes) {
      return res.json({
        success: false,
        message: "Invalid Password Please try again",
      });
    }
    const token = jwt.sign(
      { id: checkUser._id, role: checkUser.role, email: checkUser.email },
      "CLIENT_SECRET_KEY",
      {
        expiresIn: "60m",
      }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        // sameSite: "none",
        // maxAge: 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "User logged in successfully",
        user: {
          id: checkUser._id,
          email: checkUser.email,
          role: checkUser.role,
        },
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "User logged out successfully",
  });
};
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
};
