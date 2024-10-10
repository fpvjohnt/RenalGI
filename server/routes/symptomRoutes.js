const express = require('express');
const router = express.Router();
const SymptomLog = require('../models/SymptomLog');

// POST: Create a new symptom log
router.post('/add', async (req, res) => {
  try {
    const newSymptomLog = new SymptomLog(req.body);
    await newSymptomLog.save();
    res.status(201).json({ message: 'Symptom log created successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Get all symptom logs
router.get('/', async (req, res) => {
  try {
    const symptomLogs = await SymptomLog.find();
    res.status(200).json(symptomLogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
