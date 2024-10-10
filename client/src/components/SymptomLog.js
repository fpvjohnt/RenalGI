import React, { useState } from 'react';  // Removed Typography
import axios from 'axios';

function SymptomLog() {
  const [symptoms, setSymptoms] = useState({ symptomType: '', severity: '', dateTime: '' });

  const handleChange = (e) => {
    setSymptoms({ ...symptoms, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/symptoms/add', symptoms, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Symptom log added successfully!');
    } catch (error) {
      alert('Error adding symptom log: ' + error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Symptom Type:</label>
      <input type="text" name="symptomType" value={symptoms.symptomType} onChange={handleChange} required />
      
      <label>Severity (1-10):</label>
      <input type="number" name="severity" value={symptoms.severity} onChange={handleChange} min="1" max="10" required />
      
      <label>Date and Time:</label>
      <input type="datetime-local" name="dateTime" value={symptoms.dateTime} onChange={handleChange} required />
      
      <button type="submit">Log Symptom</button>
    </form>
  );
}

export default SymptomLog;
