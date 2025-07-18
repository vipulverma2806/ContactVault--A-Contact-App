const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { User, Contact } = require("./DBmodel");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log(err));

//---------------save contact-------
app.post("/addContact", async (req, res) => {
  try {
    console.log(req.body);
    const token = req.cookies.token;

    const decoded = jwt.verify(token, "SECRET_KEY");
    console.log(decoded);
    const { name, email, phoneNo, address, notes } = req.body;
    const resData = await Contact.create({
      name,
      email,
      phoneNo,
      address,
      notes,
      userId: decoded.id,
    });
    res.json(resData);
  } catch (err) {
    console.log(err);
  }
});

//--------------register Api------------------------

app.post("/register", async (req, res) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const found = await User.findOne({ email });
    if (found) return res.json("exists");
    const hashed = await bcrypt.hash(password, 10);
    const result = await User.create({ username, email, password: hashed });
    res.json(result);
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
});

//-------------------Login-----------------------

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const found = await User.findOne({ email });
    if (!found) return res.json("invalid");
    const result = await bcrypt.compare(password, found.password);
    if (!result) return res.json("invalid");
    const token = jwt.sign(
      { id: found._id, name: found.username },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );
    // console.log(`token = ${token}`);
    // console.log(`decoded = ${decoded}`);
    res.cookie("token", token, { httpOnly: true });
    res.json("Logged In");
  } catch (err) {
    console.log(err);
  }
});

//--------------------------get contact-----------------
app.get("/getContacts", async (req, res) => {
  const token = req.cookies.token;
  try {
    if (!token) return res.json("NA");
    const decoded = jwt.verify(req.cookies.token, "SECRET_KEY");
    // console.log(decoded);
    // res.json(decoded.name);
    const contacts = await Contact.find({ userId: decoded.id }).sort({
      createdAt: 1,
    });
    res.json(contacts);
  } catch (err) {
    console.log(err);
  }
});
//--------------------logout--------------------
app.post("/logout", async (req, res) => {
  const token = req.cookies.token;
  res.clearCookie("token");
  res.json("logged out");
});

// //--------------------checkAuth---------------
// app.post("/auth", async (req, res) => {
//   const token = req.cookies.token;
//   res.json(token);
// });

//-------------------------------delete--------
app.delete("/deleteContact/:id", async(req,res)=>{
  const id = req.params.id;
  try{
    const deleted = await Contact.findByIdAndDelete(id)
    console.log(deleted)
    res.json(deleted)
  }catch(err)
  {
    console.log(err)
  }
})
//---------------Edit---------------------------
app.put("/editContact/:id", async(req,res)=>{
  const id = req.params.id;
  const contact = req.body;
  try{
    const updated = await Contact.findByIdAndUpdate(id,contact,{new:true})
    console.log(updated)
    res.json(updated)
  }catch(err)
  {
    console.log(err)
  }
})
app.listen("4000", () => console.log("server running on port 4000"));
