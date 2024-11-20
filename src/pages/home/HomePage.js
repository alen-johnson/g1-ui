import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const handleStartCLick = () => {
    navigate("/gamemode");
  };

  const handleSettingClick = () => {
    navigate("/settings");
  };

  const handleHelpClick = () => {
    navigate("/help");
  };

  return (
    <div className="home">
      <div className="home__display-area">
        <p onClick={handleStartCLick}>Start Game</p>
        <p onClick={handleSettingClick}>Settings</p>
        <p onClick={handleHelpClick}>Help</p>
      </div>
    </div>
  );
}

export default HomePage;
