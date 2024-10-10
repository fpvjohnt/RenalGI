import React from 'react';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import axios from 'axios';

function GenerateReport() {
  const generatePDFReport = async () => {
    const doc = new jsPDF();

    try {
      // Fetch food logs
      const foodLogs = await axios.get('http://localhost:5000/api/food', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      // Fetch symptom logs (if you are fetching symptom logs as well)
      const symptomLogs = await axios.get('http://localhost:5000/api/symptoms', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      // Fetch AI recommendations
      const recommendations = await axios.get('http://localhost:5000/api/food/recommendations', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      // PDF Document Title
      doc.text('TRenalGI Health Report', 20, 20);

      // Add Food Logs Section
      doc.text('Food Logs:', 20, 30);
      foodLogs.data.forEach((log, index) => {
        const { foodName, mealTime, oxalateLevel, calciumContent } = log;
        doc.text(`${index + 1}. Food: ${foodName}, Time: ${mealTime}, Oxalate Level: ${oxalateLevel}, Calcium: ${calciumContent}mg`, 20, 40 + (index * 10));
      });

      // Add Symptom Logs Section (if applicable)
      doc.text('Symptom Logs:', 20, 60 + (foodLogs.data.length * 10));
      symptomLogs.data.forEach((log, index) => {
        const { symptomType, severity, dateTime } = log;
        doc.text(`${index + 1}. Symptom: ${symptomType}, Severity: ${severity}, Time: ${dateTime}`, 20, 70 + (foodLogs.data.length * 10) + (index * 10));
      });

      // Add AI Recommendations Section
      doc.text('AI-Powered Food Recommendations:', 20, 90 + (foodLogs.data.length * 10) + (symptomLogs.data.length * 10));
      recommendations.data.recommendedFoods.forEach((food, index) => {
        doc.text(`${index + 1}. ${food}`, 20, 100 + (foodLogs.data.length * 10) + (symptomLogs.data.length * 10) + (index * 10));
      });

      // Save the PDF
      doc.save('TRenalGI_HealthReport.pdf');
    } catch (error) {
      console.error('Error generating PDF report:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={generatePDFReport}>
        Generate Health Report
      </Button>
    </div>
  );
}

export default GenerateReport;
