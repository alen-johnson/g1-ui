import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/images/stoned-skull.png";
import "./Home.css";

function Home() {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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

  // Simulate the loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercentage((prev) => {
        if (prev < 100) {
          return prev + 1; // Increment progress
        } else {
          clearInterval(interval); // Clear the interval when 100 is reached
          setTimeout(() => setIsLoading(false), 500); // Wait 0.5s before removing loader
          return prev;
        }
      });
    }, 20); // Speed of progress (20ms for fast loading)

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="home">
      {isLoading ? (
        <div className="loader">
          <div className="loader__bar" style={{ width: `${loadingPercentage}%` }}></div>
          <p>{loadingPercentage}%</p>
        </div>
      ) : (
        <>
          {/* Icon or Image with Animation */}
          <img src={img} alt="Game Icon" className="home__icon" />
          <div className="home__display-area">
            <p onClick={handleStartCLick}>Start Game</p>
            <p onClick={handleSettingClick}>Settings</p>
            <p onClick={handleHelpClick}>Help</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
