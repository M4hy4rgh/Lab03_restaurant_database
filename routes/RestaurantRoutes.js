const express = require("express");
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// GET all restaurants
// http://localhost:3000/restaurants
router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET restaurants by cuisine
// http://localhost:3000/restaurants/cuisine/:cuisine
router.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  const { cuisine } = req.params.cuisine;

  try {
    const restaurants = await Restaurant.find({ cuisine });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET restaurants with selected columns and sorting
// http://localhost:3000/restaurants?sortBy=ASC
// http://localhost:3000/restaurants?sortBy=DESC
router.get("/restaurants", async (req, res) => {
  const { sortBy } = req.query;
  const selectedColumns = ["id", "cuisines", "name", "city", "restaurant_id"];

  try {
    const restaurants = await Restaurant.find({})
      .select(selectedColumns.join(" "))
      .sort({ restaurant_id: sortBy === "ASC" ? 1 : -1 });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// GET restaurants with specific criteria
// http://localhost:3000/restaurants/Delicatessen
router.get("/restaurants/:cuisine", async (req, res) => {
  const cuisine = req.params.cuisine;

  try {
    const restaurants = await Restaurant.find({
      cuisine,
      city: { $ne: "Brooklyn" },
    })
      .select("cuisines name city -_id")
      .sort({ name: 1 });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

