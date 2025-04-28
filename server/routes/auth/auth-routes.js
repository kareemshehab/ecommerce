const express = require("express");
const { registerUser, loginUser } = require("../../controllers/auth/auth-controller");
const router = express.Router();

router.post("/register", registerUser); // This is correct
router.post("/login", loginUser); // This is correct


module.exports = router;
