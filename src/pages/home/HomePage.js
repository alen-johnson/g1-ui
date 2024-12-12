import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import {
  settingIcon,
  infoIcon,
  startIcon,
  impo,
  searchIcon,
} from "../../assets/images/imageIndex";

function HomePage() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/gamemode");
  };

  const handleSettingClick = () => {
    navigate("/settings");
  };

  const handleHelpClick = () => {
    navigate("/help");
  };
  const spawnElsewhere = (event) => {
    const icon = event.target;

    const randomX = Math.floor(Math.random() * window.innerWidth);
    const randomY = Math.floor(Math.random() * window.innerHeight);

    icon.style.position = "absolute";
    icon.style.left = `${randomX}px`;
    icon.style.top = `${randomY}px`;
    const animations = ["moveAround1", "moveAround2", "moveAround3", "moveAround4"]
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

    icon.style.animation = "none";
    void icon.offsetHeight;
    icon.style.animation = `${randomAnimation} 30s linear infinite`;
  };

  document
    .querySelectorAll(
      ".home__display-area_movingIcon1, .home__display-area_movingIcon2, .home__display-area_movingIcon3, .home__display-area_movingIcon4"
    )
    .forEach((icon) => {
      icon.addEventListener("click", spawnElsewhere);
    });

  return (
    <div className="home">
      <img
        src={searchIcon}
        alt="Search Icon"
        onClick={spawnElsewhere}
        className="home__display-area_movingIcon1"
      />

      <div className="home__display-area">
        <img
          src={settingIcon}
          alt="Settings"
          onClick={handleSettingClick}
          className="home__display-area_settingIcon"
        />
        <span className="hover-text-setting">Settings</span>
        <div className="home__display-area_center">
          <img src={impo} alt="Imposter " className="home__display-area_impo" />
          <img
            src={searchIcon}
            alt="Search Icon"
            onClick={spawnElsewhere}
            className="home__display-area_movingIcon2"
          />

          <img
            src={startIcon}
            alt="Start Game"
            onClick={handleStartClick}
            className="home__display-area_startIcon"
          />
        </div>
        <img
          src={searchIcon}
          alt="Search Icon"
          onClick={spawnElsewhere}
          className="home__display-area_movingIcon3"
        />

        <img
          src={infoIcon}
          alt="About"
          onClick={handleHelpClick}
          className="home__display-area_aboutIcon"
        />
        <span className="hover-text-about">About</span>
        <img
          src={searchIcon}
          alt="Search Icon"
          onClick={spawnElsewhere}
          className="home__display-area_movingIcon4"
        />
      </div>
    </div>
  );
}

export default HomePage;
