import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/images/stoned-skull.png";
import "./Home.css";

function Home() {


  const navigate = useNavigate();

  const handleStartCLick = () => {
    navigate('/gamemode');
  };

  const handleSettingClick = () => {
    navigate('/settings');
  };

  const handleHelpClick = () => {
    navigate('/help');
  };

 

  return (
    <div className="home">
     
        <>
          {/* Icon or Image with Animation */}
          <img src={img} alt="Game Icon" className="home__icon" />
          <div className="home__display-area">
            <p onClick={handleStartCLick}>Start Game</p>
            <p onClick={handleSettingClick}>Settings</p>
            <p onClick={handleHelpClick}>Help</p>
          </div>
        </>
      
    </div>
  );
}

export default Home;
