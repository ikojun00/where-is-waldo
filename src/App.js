import Game from "./Game";
import HomePage from "./HomePage";
import Leaderboard from "./Leaderboard";
import { Route, Routes } from 'react-router-dom';
import { Fragment, useEffect, useState } from "react";
import Jak from './images/jak.webp';
import Kratos from './images/kratos.webp';
import Ratchet from './images/ratchet.webp';
import JakHeader from './images/jakHeader.webp';
import KratosHeader from './images/kratosHeader.webp';
import RatchetHeader from './images/ratchetHeader.webp';
import PS2 from './images/ps2Image.webp';
import { BarLoader } from "react-spinners";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const imgs = [Jak, Kratos, Ratchet, JakHeader, KratosHeader, RatchetHeader, PS2];
    cacheImages(imgs)
  }, []);

  const cacheImages = async(srcArray) => {
    const promises = await srcArray.map((src) => {
      return new Promise (function (resolve, reject) {
        const img = new Image();
        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
      });
    });

    await Promise.all(promises);
    setIsLoading(false);
  }

  return (
    <div className="App">
      {isLoading
      ?
      <div className="spinner">
        <BarLoader color="#36d7b7" />
      </div>
      :
      <Fragment>
      <Routes>
        <Route path="/" element={<HomePage Jak={Jak} Kratos={Kratos} Ratchet={Ratchet}/>} />
        <Route path="/game" element={<Game JakHeader={JakHeader} KratosHeader={KratosHeader} RatchetHeader={RatchetHeader} PS2={PS2}/>} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      </Fragment>}
    </div>
  );
}

export default App;
