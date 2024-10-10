const express = require('express');
const { verifyToken } = require('./authRoutes');
const router = express.Router();
const FoodLog = require('../models/FoodLog');

// POST: Add new food log (protected route)
router.post('/add', verifyToken, async (req, res) => {
  try {
    const { foodName, mealTime, glutenFree, oxalateLevel, calciumContent, userComments } = req.body;

    if (!foodName || !mealTime || glutenFree === undefined || !oxalateLevel || calciumContent === undefined) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const newFoodLog = new FoodLog({
      foodName,
      mealTime,
      glutenFree,
      oxalateLevel,
      calciumContent,
      userComments,
      user: req.user.id, // Associate log with the user
    });

    await newFoodLog.save();
    res.status(201).json({ message: 'Food log created successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Fetch all food logs (optional)
router.get('/', verifyToken, async (req, res) => {
  try {
    const foodLogs = await FoodLog.find({ user: req.user.id });
    res.status(200).json(foodLogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
