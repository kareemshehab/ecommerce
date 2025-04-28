const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth/auth-routes");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://kemetitch2255:kemetitch2222@cluster0.sf1usx0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is running on port ${PORT}`);
});
