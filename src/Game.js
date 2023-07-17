import React, { useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Timer from './Timer';
import { db } from './firebase';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Game = ({JakHeader, KratosHeader, RatchetHeader, PS2}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [originalDropdownPosition, setOriginalDropdownPosition] = useState({ x: -1, y: -1 });
  const [currentDropdownPosition, setCurrentDropdownPosition] = useState({ x: -1, y: -1 });
  const [firestoreData, setFirestoreData] = useState([]);
  const imageRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const addData = async () => {
      try {
        if (firestoreData.length === 0 && originalDropdownPosition.x !== -1) {
          const timerElement = document.querySelector(".timer").textContent;
          const player = prompt(`Your time is ${timerElement}. Your name is: `)

          if (timerElement) {
            await addDoc(collection(db, "leaderboard"), {
              name: player,
              time: timerElement
            });
          }
          setShouldRender(true);
        }
      } catch (error) {
        console.log('Error adding document:', error);
      }
    };
    addData();
  }, [firestoreData.length, originalDropdownPosition.x]);

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

      // npm notifications
      toast.success(`You found ${option}!`);

      setFirestoreData(updatedFirestoreData);

    } else {
      toast.error(`That is not ${option}!`);
    }
  };

  return (
    <div>
      <div className="header">
        <Timer />
        <div className='headerChar'>
          <img src={JakHeader} alt="Jak" />
          <p>Jak</p>
        </div>
        <div className='headerChar'>
          <img src={KratosHeader} alt="Kratos" />
          <p>Kratos</p>
        </div>
        <div className='headerChar'>
          <img src={RatchetHeader} alt="Ratchet" />
          <p>Ratchet</p>
        </div>
      </div>
      <img ref={imageRef} src={PS2} alt="PS2" onClick={handleClick} />
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
      {shouldRender && (
        <Navigate to={"/leaderboard"} />
      )}

      <ToastContainer />
    </div>
  );
};

export default Game;