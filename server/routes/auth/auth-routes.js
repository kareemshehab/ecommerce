const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");
const router = express.Router();

router.post("/register", registerUser); // This is correct
router.post("/login", loginUser); // This is correct
router.post("/logout", logoutUser); // This is correct
router.get("/check-auth", authMiddleware,(req, res) => {
    const user = req.user;
    res.status(200).json({ success: true, message: "User is authenticated", user });
}); // This is correct


module.exports = router;
