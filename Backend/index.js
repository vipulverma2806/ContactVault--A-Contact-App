const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookiParser = require("cookie-parser");

const cors = require("cors");
const { User, Contact } = require("./DBmodel");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log(err));

//--------------register Api------------------------

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const found = await User.findOne({ email });
    if (found) return res.status(400).json("User already exists");
    const hashed = await bcrypt.hash(password, 10);
    const result = await User.create({ username, email, password: hashed });

    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

//-------------------Login-----------------------

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const found = await User.findOne({ email });
    if (!found) return res.json("invalid credintials");
    const decoded = await bcrypt.compare(password, found.password);
    const token = await jwt.sign({id:found._id},"SECRET_KEY",{expiresIn:"1d"})
    console.log(token)

    console.log(decoded);
  } catch (err) {
    console.log(err);
  }
});

app.listen("4000", () => console.log("server running on port 4000"));
