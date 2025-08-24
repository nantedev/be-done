import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Don from "./models/don.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173"
};


mongoose.connect("mongodb://localhost:27017/done");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

app.use(cors(corsOptions));

app.get("/dons", async (req, res) => {
  const dons = await Don.find({});
  res.send(dons);
});

app.get("/don/:id", async (req, res) => {
  const { id } = req.params;
  const don = await Don.findById(id);
  res.send(don);
});

app.get("/", (req, res) => {
  res.send("express is running");
});

app.listen(3001, () => {
  console.log("backend app is running on port 3001");
});
