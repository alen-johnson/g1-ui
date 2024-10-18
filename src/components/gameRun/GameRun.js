import React, { useEffect, useState } from "react";
import "./GameRun.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { CloseCircleOutlined, StepForwardOutlined } from "@ant-design/icons";

const GameRun = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerSet, setPlayerSet] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [exitModal, setExitModal] = useState(false);
  const [items, setItems] = useState([]);
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

  // Fetching content based on category
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const apiUrl = getApiUrl(category);
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setItems(data.map((item) => item.name)); // Store fetched data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading once fetch is complete
      }
    };

    fetchContent();
  }, [category]);

  // Initializing player set once items are fetched
  useEffect(() => {
    if (items.length > 0) {
      const initialPlayerSet = makeImposter([...items], players);
      setPlayerSet(initialPlayerSet);
    }
  }, [items]);

  // Switch case for determining API URL based on category
  const getApiUrl = (category) => {
    switch (category) {
      case "Sports & Athletes":
        return "http://localhost:5000/api/sports";
      case "Fiction":
        return "http://localhost:5000/api/fictions";
      case "Celebrities":
        return "http://localhost:5000/api/celebrities";
      case "World Leaders":
        return "http://localhost:5000/api/leaders";
      case "Household":
        return "http://localhost:5000/api/Households";
      default:
        return "http://localhost:5000/api/sports";
    }
  };

  // Make imposter function assigns item names to players
  const makeImposter = (items, players) => {
    if (items.length < 2) return console.log("Start New Game");

    const imposterItem = getRandomItem(items);
    const commonItem = getRandomItem(items);

    const imposterIndex = Math.floor(Math.random() * players.length);
    return players.reduce((dict, player, index) => {
      dict[player] = index === imposterIndex ? imposterItem : commonItem;
      return dict;
    }, {});
  };

  // Function to get random item from the list and remove it
  const getRandomItem = (items) => {
    const randomIndex = Math.floor(Math.random() * items.length);
    const [item] = items.splice(randomIndex, 1);
    return item;
  };

  if (!playerSet) return <div>Loading...</div>;

  const entries = Object.entries(playerSet);

  // Display the next key-value pair
  const handleNextClick = () => {
    setIsVisible(false);

    if (currentIndex === entries.length - 1) {
      const newPlayerSet = makeImposter([...items], players);
      setPlayerSet(newPlayerSet);
      setCurrentIndex(0); // Reset index to start from the first player
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsVisible(true);
    }, 1000);
  };

  const handleClearClick = () => {
    setIsVisible(false);
  };
  const handleXClick = () => {
    setExitModal(true);
  };

  const handleResetClick = () => {
    const newPlayerSet = makeImposter([...items], players);
    setPlayerSet(newPlayerSet);
    setCurrentIndex(0); // Reset index to start from the first player
    setIsVisible(true);
  };

  return (
    <div className="game-run">
      <div className="game-run__display-area">
        <CloseCircleOutlined
          style={{ color: "black", fontSize: 20 }}
          onClick={handleXClick}
        />
        <div class="buttons">
          <button class="btn" onClick={handleResetClick}>
            <span></span>
            <p
              data-start="good luck!"
              data-text="start!"
              data-title="new game"
            ></p>
          </button>
        </div>
        <Modal
          title="Exit to main menu?"
          visible={exitModal}
          onOk={() => navigate("/")}
          onCancel={() => setExitModal(false)}
          okText="Yes"
          cancelText="No"
          cancelButtonProps={{ className: "" }}
          okButtonProps={{ className: "" }}
        />
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
              next up : {`${entries[(currentIndex + 1) % entries.length][0]} `}
            </p>
          )}
        </div>
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
  );
};

export default GameRun;
