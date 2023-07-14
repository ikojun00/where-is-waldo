import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";

const Leaderboard = () => {
  const [firestoreData, setFirestoreData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "leaderboard"));
        const data = querySnapshot.docs.map(doc => doc.data());
        data.sort((a, b) => {
            if (a.time < b.time) {
                return -1;
            }
            if (a.time > b.time) {
                return 1;
            }
            
            return 0;
        });
        setFirestoreData(data);
      } catch (error) {
        console.log('Error getting documents:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="leaderboard">
        <h3>Leaderboard</h3>
        <table className="results">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {firestoreData.map((item, index) => (
                    <tr key={index} className="player">
                        <td>{item.name}</td> 
                        <td>{item.time}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default Leaderboard;