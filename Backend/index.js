const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { Pool } = require("pg");
const { User, Contact } = require("./DBmodel");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ContactVault",
  password: "vipul1234",
  port: "5432",
});

// const MONGO_URL = process.env.MONGO_URL;
// mongoose
//   .connect(MONGO_URL)
//   .then(() => console.log("connected to MongoDB"))
//   .catch((err) => console.log(err));

//---------------save contact-------
app.post("/addContact", async (req, res) => {
  try {
    console.log(req.body);
    const token = req.cookies.token;
    // console.log("callings contact")
    const decoded = jwt.verify(token, "SECRET_KEY");
    console.log(decoded);
    const { name, email, phoneNo, address, notes } = req.body;
    const resData = await pool.query(
      "INSERT INTO contacts (name, email, phone_no, address, notes,userid) VALUES ($1,$2,$3,$4,$5,$6) ",
      [name, email, phoneNo, address, notes, decoded.id],
    );
    console.log(resData);
    res.json(resData);
  } catch (err) {
    console.log(err);
  }
});

//--------------register Api------------------------

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const found = await pool.query("Select * FROM users WHERE email = ($1)", [
      email,
    ]);

    if (found.rowCount) return res.json("exists");
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username,email,password) VALUES($1,$2,$3)",
      [username, email, hashed],
    );

    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

//-------------------Login-----------------------

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // const found = await User.findOne({ email });
    const found = await pool.query("Select * FROM users WHERE email = ($1)", [
      email,
    ]);
    if (!found.rowCount) return res.json("invalid");
    const result = await bcrypt.compare(password, found.rows[0].password);
    if (!result) return res.json("invalid");
    const token = jwt.sign(
      { id: found.rows[0].id, name: found.rows[0].username },
      "SECRET_KEY",
      { expiresIn: "1d" },
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
    // const contacts = await Contact.find({ userId: decoded.id }).sort({
    //   createdAt: 1,
    // });

    const contacts = await pool.query(
      "SELECT * From contacts WHERE userID = $1",
      [decoded.id],
    );

    res.json(contacts.rows);
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
app.delete("/deleteContact/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // const deleted = await Contact.findByIdAndDelete(id);
    const deleted = await pool.query("DELETE FROM contacts WHERE id = $1", [
      id,
    ]);
    console.log(deleted);
    res.json(deleted);
  } catch (err) {
    console.log(err);
  }
});
//---------------Edit---------------------------
app.put("/editContact/:id", async (req, res) => {
  const id = req.params.id;
  const contact = req.body;
  const {name,email,phoneNo,address,notes} = contact;
  console.log(contact)
  try {
    // const updated = await Contact.findByIdAndUpdate(id, contact, { new: true });
    const updated = await pool.query("UPDATE contacts SET name=$1, phone_no=$2, email=$3, address=$4, notes=$5 WHERE id=$6",[name,phoneNo,email,address,notes,id])
    console.log(updated);
    res.json(updated);
  } catch (err) {
    console.log(err);
  }
});
app.listen("4000", () => console.log("server running on port 4000"));
