import mongoose from "mongoose";
import cities from "./cities.js";
import {descriptors, names, types} from "./seedHelpers.js";
import Don from "../models/don.js";

mongoose.connect("mongodb://localhost:27017/done");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Don.deleteMany({});
 for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const don = new Don({
            title: `${sample(names)} ${sample(descriptors)} `,
            location: `${cities[random1000].city_code}, ${cities[random1000].region_geojson_name}`
        });
    await don.save();
  }
};

seedDB().then(() => {
    mongoose.connection.close();
})
