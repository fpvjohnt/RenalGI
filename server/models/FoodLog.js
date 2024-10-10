const mongoose = require('mongoose');

const foodLogSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  mealTime: { type: Date, required: true },
  glutenFree: { type: Boolean, required: true },
  oxalateLevel: { type: String, enum: ['low', 'medium', 'high'], required: true },
  calciumContent: { type: Number, required: true }, // in mg
  userComments: { type: String },
});

const FoodLog = mongoose.model('FoodLog', foodLogSchema);
module.exports = FoodLog;
