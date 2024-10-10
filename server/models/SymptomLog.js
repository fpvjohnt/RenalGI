const mongoose = require('mongoose');

const symptomLogSchema = new mongoose.Schema({
  symptomType: { type: String, required: true },  // e.g., "IBD", "Urine", etc.
  severity: { type: Number, required: true },  // scale from 1 to 10
  dateTime: { type: Date, required: true },
  notes: { type: String }
});

const SymptomLog = mongoose.model('SymptomLog', symptomLogSchema);
module.exports = SymptomLog;
