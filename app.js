import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("express is running");
});

app.listen(3001, () => {
  console.log("backend app is running on port 3001");
});
