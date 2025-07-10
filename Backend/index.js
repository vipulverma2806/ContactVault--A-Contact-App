const express = require('express');
const mongoose =require('mongoose');
const dotenv = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookiParser = require('cookie-parser')
dotenv.config();
const app = express();
app.use(express.json())


const MONGO_URL = process.env.MONGO_URL;
mongoose.connect()

