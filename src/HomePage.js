import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ Jak, Kratos, Ratchet }) => {
  return (
    <div className="homePage">
      <div className="homePageText">
        <div className="homePageHeader">
            Find these characters as fast as you can. Good luck!
        </div>
        <div className="homePageImages">
            <div className='homePageChar'>
                <img src={Jak} alt="Jak" />
                <h3>Jak</h3>
            </div>
            <div className='homePageChar'>
                <img src={Kratos} alt="Kratos" />
                <h3>Kratos</h3>
            </div>
            <div className='homePageChar'>
                <img src={Ratchet} alt="Ratchet" />
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