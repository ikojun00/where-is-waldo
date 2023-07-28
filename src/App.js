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
import PS2_325w from './images/ps2Image_325.webp';
import PS2_375w from './images/ps2Image_375.webp';
import PS2_425w from './images/ps2Image_425.webp'
import PS2_768w from './images/ps2Image_768.webp'
import PS2_1024w from './images/ps2Image_1024.webp'
import PS2_1440w from './images/ps2Image_1440.webp'
import { BarLoader } from "react-spinners";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const imgs = [Jak, Kratos, Ratchet, JakHeader, KratosHeader, RatchetHeader, 
    PS2_325w, PS2_375w, PS2_425w, PS2_768w, PS2_1024w, PS2_1440w];
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
        <Route path="/game" element={<Game JakHeader={JakHeader} KratosHeader={KratosHeader} RatchetHeader={RatchetHeader} 
        PS2_325w={PS2_325w} PS2_375w={PS2_375w} PS2_425w={PS2_425w} PS2_768w={PS2_768w} PS2_1024w={PS2_1024w} PS2_1440w={PS2_1440w}/>} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      </Fragment>}
    </div>
  );
}

export default App;
