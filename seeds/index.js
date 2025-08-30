import mongoose from "mongoose";
import cities from "./cities.js";
import {objets} from "./seedHelpers.js";
import Don from "../models/don.js";

mongoose.connect("mongodb://localhost:27017/done");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});



const seedDB = async () => {
  await Don.deleteMany({});
  const seedDons = objets.map(objet => {
    const random1000 = Math.floor(Math.random() * 1000);
    const city = cities[random1000];
    return {
      title: objet.name,
      description: objet.description,
      location: `${city.city_code}, ${city.region_geojson_name}`,
      image: objet.image
    };
  });
  await Don.insertMany(seedDons);
};

seedDB().then(() => {
    mongoose.connection.close();
})
