import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ReportGeneration() {
  const generatePDF = () => {
    const input = document.getElementById('report');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('report.pdf');
    });
  };

  return (
    <div>
      <div id="report">
        <h2>Your Health Report</h2>
        <p>Include summary of logs here...</p>
      </div>
      <button onClick={generatePDF}>Download Report as PDF</button>
    </div>
  );
}

export default ReportGeneration;
