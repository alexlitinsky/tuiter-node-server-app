import express from 'express';
import cors from 'cors';
import session from "express-session";
import HelloController from "./controllers/hello-controller.js"
import UserController from './users/users-controller.js';
import TuitsController from './controllers/tuits/tuits-controller.js';
import AuthController from './users/auth-controller.js';
import mongoose from 'mongoose';
const DB_SERVER = "mongodb+srv://Cluster14538:R2lLZHNRVk9f@cluster14538.rapizri.mongodb.net/tuiter"
// const DB_SERVER = "mongodb+srv://Cluster14538:R2lLZHNRVk9f@cluster14538.rapizri.mongodb.net/?appName=mongosh+1.9.1/tuiter"
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || DB_SERVER
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(
  session({
    secret: "any string",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://wd-a5-thriving-entremet-f12849.netlify.app", "https://tuiter-node-server-app-a6.onrender.com"],
  })
);

// Set the Access-Control-Allow-Origin header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your desired origin or whitelist specific origins instead
  next();
});
TuitsController(app);
HelloController(app)
UserController(app)
AuthController(app)
app.listen(process.env.PORT || 4000)
