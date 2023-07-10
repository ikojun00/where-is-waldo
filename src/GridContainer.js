import React, { useState } from 'react';
import './index.css';

const GridContainer = () => {
  const [gridData, setGridData] = useState(Array(6318).fill(null));
  const [selectedGridIndex, setSelectedGridIndex] = useState(null);

  const handleOptionsClick = (option) => {
    // Update the gridData with the selected option at the selectedGridIndex
    const updatedGridData = [...gridData];
    updatedGridData[selectedGridIndex] = option;
    console.log('yes')
    setGridData(updatedGridData);
  };

  const handleGridClick = (index) => {
    setSelectedGridIndex(index);
  };

  return (
    <div className="grid-container">
      {gridData.map((gridItem, index) => (
        <div
          key={index}
          className={`grid-item${selectedGridIndex === index ? '-selected' : ''}`}
          onClick={() => handleGridClick(index)}
        >
          {selectedGridIndex === index && (
            <div className="options">
              <button onClick={() => handleOptionsClick('Kratos')}>Kratos</button>
              <button onClick={() => handleOptionsClick('Jax')}>Jax</button>
              <button onClick={() => handleOptionsClick('Option 3')}>Ratchet</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GridContainer;