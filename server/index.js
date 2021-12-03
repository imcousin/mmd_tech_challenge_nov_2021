import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// user model
import User from "./models/User.js";

// Load env variables
dotenv.config();

// Initial APP
const app = express();

// Setting up bodyParser for sending out requests
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@mmd.xmfwp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const CONNECTION_URL = 'mongodb://mongo:27017/docker-node-mongo';

// Set default to 8000 if there is no PORT variable
const PORT = process.env.PORT || 8080;


// Connecting to mongodb
// Set options to suppress warnings in console
mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));




// Routes
app.post('/users/login', async (req, res) => {
  console.log('/users/login');
  console.log(req.body);

  const user = await User.findOne({
    email: req.body.email
  })

  if (!user) {
    console.log('user not in db');
    return res.status(400).json({ status: 'error', error: 'Invalid Login' })
  }

  // Check if user password is correct with db
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  )

  if (isPasswordValid) {
    console.log('pw valid');
    const token = jwt.sign({
      email: user.email,
      admin: user.admin
    }, 'secret123')

    return res.status(200).json({ user: token })
  }
  else {
    return res.status(400).json({ status: 'error', user: false })
  }
})

app.get('assignments', () => {
  
})