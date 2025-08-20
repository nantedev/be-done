import mongoose from "mongoose";

const Schema = mongoose.Schema;

const donSchema = new Schema({
  title: String,
  price: String,
  description: String,
  location: String
});

const Don = mongoose.model("Don", donSchema);
export default Don;