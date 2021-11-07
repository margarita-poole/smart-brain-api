import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";

import register from "./controllers/register.js";
import signin from "./controllers/signin.js";
import profile from "./controllers/profile.js";
import image from "./controllers/image.js";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "smart-brain",
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("this is working");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(db, bcrypt)(req, res);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app is running on port ${process.env.PORT}");
});