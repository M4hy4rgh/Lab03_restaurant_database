const express = require("express");
const mongoose = require("mongoose");
const restaurantRoutes = require("./routes/RestaurantRoutes");
require("dotenv").config();


const app = express();
app.use(express.json());
const SERVER_PORT = 3000;

const DB_CONNECTION_STRING = process.env.REACT_APP_CONECTION_STRING_RES;

mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((success) => {
    console.log(`MongoDB connected ${success}`);
  })
  .catch((err) => {
    console.log(`Error while MongoDB connection ${err}`);
  });

app.use(restaurantRoutes);


app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
