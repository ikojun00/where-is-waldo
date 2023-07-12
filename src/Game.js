import React, { useState, useRef, useEffect } from 'react';
import Timer from './Timer';
import image from './images/ps2Image.jpg';
import Jak from './images/jakHeader.png';
import Kratos from './images/kratosHeader.png';
import Ratchet from './images/ratchetHeader.png';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";

const Game = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [originalDropdownPosition, setOriginalDropdownPosition] = useState({ x: 0, y: 0 });
  const [currentDropdownPosition, setCurrentDropdownPosition] = useState({ x: 0, y: 0 });
  const [firestoreData, setFirestoreData] = useState([]);
  const imageRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "characters"));
        const data = querySnapshot.docs.map(doc => doc.data());
        setFirestoreData(data);
      } catch (error) {
        console.log('Error getting documents:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (event) => {
    console.log(firestoreData)
    const imageBounds = imageRef.current.getBoundingClientRect();
    const originalWidth = imageRef.current.naturalWidth;
    const originalHeight = imageRef.current.naturalHeight;
  
    // Calculate the current dimensions of the image
    const currentWidth = imageBounds.width;
    const currentHeight = imageBounds.height;
  
    // Calculate the ratio of the original dimensions to the current dimensions
    const widthRatio = originalWidth / currentWidth;
    const heightRatio = originalHeight / currentHeight;
  
    // Calculate the responsive offsetX and offsetY values
    const offsetX = Math.floor((event.nativeEvent.offsetX) * widthRatio);
    const offsetY = Math.floor((event.nativeEvent.offsetY) * heightRatio);
  
    setShowDropdown(!showDropdown);
    setOriginalDropdownPosition({ x: offsetX, y: offsetY });
    setCurrentDropdownPosition({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
    console.log('Clicked coordinates:', { x: offsetX, y: offsetY });
  };

  const handleOptionSelect = (option) => {
    setShowDropdown(false);
    handleResult(option);
  };

  const handleResult = (option) => {
    const foundCharacter = firestoreData.find(character =>
      character.name === option &&
      character.lowest_x < originalDropdownPosition.x &&
      character.lowest_y < originalDropdownPosition.y &&
      character.highest_x > originalDropdownPosition.x &&
      character.highest_y > originalDropdownPosition.y
    );
    
    if (foundCharacter) {
      const updatedFirestoreData = firestoreData.filter(
        (character) => character.name !== option
      );
      console.log(updatedFirestoreData)
      if(updatedFirestoreData.length === 0) 
        prompt(`Congrats! Your time is ${document.querySelector(".timer").textContent}. Enter your name to add you to a leaderboard`);
      setFirestoreData(updatedFirestoreData);
    } else {
      alert(`That is not ${option}`);
    }
  };

  return (
    <div>
      <div className="header">
        <Timer/>
        <div className='headerChar'>
          <img src={Jak} alt="Jak" />
          <p>Jak</p>
        </div>
        <div className='headerChar'>
          <img src={Kratos} alt="Kratos" />
          <p>Kratos</p>
        </div>
        <div className='headerChar'>
          <img src={Ratchet} alt="Ratchet" />
          <p>Ratchet</p>
        </div>
      </div>
      <img ref={imageRef} src={image} alt="PS2" onClick={handleClick} />
      {showDropdown && (
        <div className="dropdown-menu" style={{ top: currentDropdownPosition.y, left: currentDropdownPosition.x }}>
          <ul>
            {firestoreData.map((item, index) => (
              <li key={index} className="options" onClick={() => handleOptionSelect(item.name)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Game;