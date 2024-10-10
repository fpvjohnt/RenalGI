import React from 'react';

function Section({ children, backgroundColor }) {
  return (
    <div style={{ backgroundColor: backgroundColor, padding: '40px 20px' }}>
      {children}
    </div>
  );
}

export default Section;
