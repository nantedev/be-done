import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Don from "./models/don.js";
import catchAsync from "./utils/catchAsync.js";
import ExpressError from "./utils/ExpressError.js";
import { donJoiSchema } from "./joiSchema.js";

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
app.use(bodyParser.json());

const validateDon = (req, res, next) => {
  const { error } = donJoiSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(msg, 400);
    } else {
        next();
  }
};

app.get("/dons", catchAsync(async (req, res) => {
  const dons = await Don.find({});
  res.send(dons);
}));

app.post("/dons/new", validateDon, catchAsync(async (req, res) => {
  const don = new Don(req.body.don);
  await don.save();
  res.send(don._id);
}));

app.get("/dons/:id", catchAsync(async (req, res) => {
  const { id } = req.params;
  const don = await Don.findById(id);
  res.send(don);
}));

app.put("/dons/:id", validateDon, catchAsync(async (req, res) => {
  const { id } = req.params;
  const don = await Don.findByIdAndUpdate(id, { ...req.body.don });
  res.send(don._id);
}));

app.get("/dons/:id/delete", catchAsync(async (req, res) => {
  const { id } = req.params;
  await Don.findByIdAndDelete(id);
  res.status(200).send("ok");
}));

app.get("/", (req, res) => {
  res.send("express is running");
});

app.use((req, res, next) => {
  next(new ExpressError("Cette page n'existe pas.", 404));
})

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Quelque chose ne va pas" } = err;
  res.status(statusCode).send(message);
})

app.listen(3001, () => {
  console.log("backend app is running on port 3001");
});
