import React, { useState, useRef, useEffect } from 'react';
import image from './images/ps2Image.jpg';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const Game = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'your_collection', 'your_document');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log('Document data:', data);
          // Handle the retrieved data as needed
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error getting document:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (event) => {
    const imageBounds = imageRef.current.getBoundingClientRect();
    const x = event.clientX - imageBounds.left;
    const y = event.clientY - imageBounds.top;
    setShowDropdown(!showDropdown);
    setDropdownPosition({ x, y });
    console.log('Clicked coordinates:', { x, y });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <div>
      <img ref={imageRef} src={image} alt="PS2" onClick={handleClick} />
      {showDropdown && (
        <div className="dropdown-menu" style={{ top: dropdownPosition.y, left: dropdownPosition.x }}>
          <ul>
            <li className="options" onClick={() => handleOptionSelect('Kratos')}>
              Kratos
            </li>
            <li className="options" onClick={() => handleOptionSelect('Jax')}>
              Jax
            </li>
            <li className="options" onClick={() => handleOptionSelect('Ratchet')}>
              Ratchet
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Game;