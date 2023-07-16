import React from 'react';
import { Link } from 'react-router-dom';
import Jak from './images/jak.webp';
import Kratos from './images/kratos.webp';
import Ratchet from './images/ratchet.webp';
import PreloadImage from './PreloadImage';

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="homePageText">
        <div className="homePageHeader">
            Find these characters as fast as you can. Good luck!
        </div>
        <div className="homePageImages">
            <div className='homePageChar'>
                <PreloadImage src={Jak} alt="Jak" />
                <h3>Jak</h3>
            </div>
            <div className='homePageChar'>
                <PreloadImage src={Kratos} alt="Kratos" />
                <h3>Kratos</h3>
            </div>
            <div className='homePageChar'>
                <PreloadImage src={Ratchet} alt="Ratchet" />
                <h3>Ratchet</h3>
            </div>
        </div>
        <div className="btnPlayNow">
          <Link to="/game"><button>Play Now</button></Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;