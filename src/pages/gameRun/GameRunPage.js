import React, { useEffect, useState } from "react";
import "./GameRunPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Button,Select } from "antd";
import { StepForwardOutlined } from "@ant-design/icons";
import { Navbar } from "../../components/componentsIndex";
import {
  calcScore,
  fetchContent,
  makeImposter,
} from "../../helpers/helperIndex";

const GameRunPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerSet, setPlayerSet] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [exitModal, setExitModal] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const [openScore, setOpenScore] = useState(false);
  const [openSession, setOpenSession] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const category = location.state.category;
  const pNum = location.state?.num || 5;

  // Create players based on participants or default
  const createPlayers = (playerCount) => {
    return Array.from({ length: playerCount }, (_, i) => `Player ${i + 1}`);
  };

  const players =
    location.state?.participants && location.state.participants.length > 0
      ? location.state.participants
      : createPlayers(pNum);
  const initialScores = players.reduce((acc, player) => {
    acc[player] = 0;
    return acc;
  }, {});

  const [scores, setScores] = useState(initialScores);
  // Fetching content based on category
  useEffect(() => {
    fetchContent(category, setLoading, setItems);
  }, [category]);

  // Initializing player set once items are fetched
  useEffect(() => {
    if (items.length > 0) {
      const initialPlayerSet = makeImposter([...items], players);
      setPlayerSet(initialPlayerSet);
    }
  }, [items]);

  if (!playerSet)
    return (
      <div className="game-run__loader">
        <div>Loading</div>
      </div>
    );

  const entries = Object.entries(playerSet);

  // Display the next key-value pair
  const handleNextClick = () => {
    setIsVisible(false);

    if (currentIndex === entries.length - 1) {
      const newPlayerSet = makeImposter([...items], players);
      setFlipped(true);
      setPlayerSet(newPlayerSet);
      setCurrentIndex(0); // Reset index to start from the first player
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsVisible(true);
      }, 1000);
    }
  };

  const handleClearClick = () => {
    setIsVisible(false);
  };
  const handleResetClick = () => {
    const newPlayerSet = makeImposter([...items], players);
    setPlayerSet(newPlayerSet);
    setCurrentIndex(0); // Reset index to start from the first player
    setIsVisible(true);
  };

  const handleSelectedPlayers = (winners) => {
    setSelectedPlayers(winners);
  };
  const handleOKClick = () => {
    setTimeout(() => {
      setFlipped(false);
      setIsVisible(false);
    }, 1000);
    const newPlayerSet = makeImposter([...items], players);
    setPlayerSet(newPlayerSet);
    setCurrentIndex(0); // Reset index to start from the first player
    setIsVisible(true);

    setScores((prevScores) => {
      return calcScore(prevScores, selectedPlayers);
    });
  };
  return (
    <div className="game-run">
      <div className="game-run__side">
        <Navbar
          scores={scores}
          exitModal={exitModal}
          setExitModal={setExitModal}
          openScore={openScore}
          setOpenScore={setOpenScore}
          openSession={openSession}
          setOpenSession={setOpenSession}
          navigate={navigate}
        />
      </div>
      <div className={`game-run__display-area ${flipped ? "flipped" : ""}`}>
        <div className="front">
          <div className="game-run__buttons">
            <button
              className="game-run__buttons-btn"
              onClick={handleResetClick}
            >
              <span></span>
              <p
                data-start="good luck!"
                data-text="start!"
                data-title="new round"
              ></p>
            </button>
          </div>
          <div className="game-run__box">
            {isVisible && (
              <div>
                <p>{`${entries[currentIndex][0]} :`}</p>
                <p>{`  ${entries[currentIndex][1]}`}</p>
              </div>
            )}
            {isVisible && (
              <p>
                {" "}
                next up :{" "}
                {`${entries[(currentIndex + 1) % entries.length][0]} `}
              </p>
            )}
          </div>

          <div className="game-run__btns">
            <Button
              className="game-run__button"
              icon={<StepForwardOutlined />}
              loading={loading}
              onClick={handleNextClick}
            >
              Next
            </Button>

            <Button
              className="game-run__button game-run__button--clear"
              onClick={handleClearClick}
            >
              Clear
            </Button>
          </div>
        </div>
        <div className="back">
          <Select
            mode="multiple"
            allowClear
            placeholder="Winner"
            style={{ width: "40%" }}
            onChange={(value) => handleSelectedPlayers(value)}
          >
            {players.map((p, key) => {
              return <Select.Option key={key} value={p}></Select.Option>;
            })}
          </Select>
          <Button onClick={handleOKClick}>OK</Button>
        </div>
      </div>
    </div>
  );
};

export default GameRunPage;
