import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
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

<button onClick={handleStartCLick}>
    P L A Y
    <div id="clip">
        <div id="leftTop" class="corner"></div>
        <div id="rightBottom" class="corner"></div>
        <div id="rightTop" class="corner"></div>
        <div id="leftBottom" class="corner"></div>
    </div> 
    <span id="rightArrow" class="arrow"></span>
    <span id="leftArrow" class="arrow"></span>
</button>


<button onClick={handleSettingClick}>
    S E T T I N G S
    <div id="clip">
        <div id="leftTop" class="corner"></div>
        <div id="rightBottom" class="corner"></div>
        <div id="rightTop" class="corner"></div>
        <div id="leftBottom" class="corner"></div>
    </div> 
    <span id="rightArrow" class="arrow"></span>
    <span id="leftArrow" class="arrow"></span>
</button>


<button onClick={handleHelpClick}>
    H E L P
    <div id="clip">
        <div id="leftTop" class="corner"></div>
        <div id="rightBottom" class="corner"></div>
        <div id="rightTop" class="corner"></div>
        <div id="leftBottom" class="corner"></div>
    </div> 
    <span id="rightArrow" class="arrow"></span>
    <span id="leftArrow" class="arrow"></span>
</button>

      </div>
    </div>
  );
}

export default Home;
