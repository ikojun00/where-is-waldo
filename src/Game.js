import React, { useState, useRef, useEffect } from 'react';
import image from './images/ps2Image.jpg';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";

const Game = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [firestoreData, setFirestoreData] = useState([]);
  const imageRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "characters"));
        const data = querySnapshot.docs.map(doc => doc.data());
        setFirestoreData(data);
        console.log('Fetched data:', data);
      } catch (error) {
        console.log('Error getting documents:', error);
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
    setShowDropdown(false);
    handleResult(option);
  };

  const handleResult = (option) => {
    console.log(firestoreData);
    const foundCharacter = firestoreData.find(character =>
      character.name === option &&
      character.lowest_x < dropdownPosition.x &&
      character.lowest_y < dropdownPosition.y &&
      character.highest_x > dropdownPosition.x &&
      character.highest_y > dropdownPosition.y
    );
    
    if (foundCharacter) {
      console.log('Found:', foundCharacter);
    } else {
      console.log('Not found');
    }
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