import React, { useEffect, useState } from "react";
import "./GameRun.css";
// import { items } from "../../assets/contents/contens";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { CloseCircleOutlined, StepForwardOutlined } from "@ant-design/icons";

const GameRun = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [player_set, setPlayer_set] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [exitModal, setExitModal] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/athletes"); // Your backend endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const names = data.map((item) => item.name);

        setItems(names); // Store fetched data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading once fetch is complete
      }
    };

    fetchPlayers();
  }, []);

  //for some reason - doesnt convert null to object without the below code
  useEffect(() => {
    const initialPlayerSet = makeImposter([...item_list], players);
    setPlayer_set(initialPlayerSet);
  }, [items]);

  const location = useLocation();
  const pNum = location.state?.num || 5;

  //function returns a list of players
  const createPlayers = () => {
    let p_list = [];
    for (let i = 1; i <= pNum; i++) {
      p_list.push(`Player ${i}`);
    }

    return p_list;
  };

  const players =
    location.state?.players && location.state.players.length > 0
      ? location.state.players
      : createPlayers();
  const item_list = items;

  // function return a dictionary with key as player and value as assigned names, where one player has a unique name
  const makeImposter = (items, pl) => {
    if (items.length < 2) {
      console.log("Start New Game");
    }

    let n = Math.floor(Math.random() * items.length);

    let imposter_item = items[n];
    items.splice(n, 1);
    // console.log(imposter_item)

    n = Math.floor(Math.random() * items.length);

    let common_item = items[n];
    items.splice(n, 1);
    // console.log(common_item);

    n = Math.floor(Math.random() * pl.length);
    let dict = {};
    //loop assigns item names for players
    for (let i = 0; i < pl.length; i++) {
      if (i === n) {
        dict[pl[i]] = imposter_item;
      } else {
        dict[pl[i]] = common_item;
      }
    }

    return dict;
  };

  if (!player_set) {
    return <div>Loading...</div>;
  }

  const entries = Object.entries(player_set);

  // Function to display the next key-value pair
  const handleNextClick = () => {
    setIsVisible(false);
    if (currentIndex === entries.length - 1) {
      // If last player has been displayed, reset and create new player set
      const newPlayerSet = makeImposter([...item_list], players);
      setPlayer_set(newPlayerSet);
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
    const initialPlayerSet = makeImposter([...item_list], players);
    setPlayer_set(initialPlayerSet);
    setCurrentIndex(0); // Reset index to start from the first player

    setIsVisible(true);
  };

  return (
    <div className="game-run">
      <div className="game-run__display-area">
        {/* <Button 
        icon={<CloseCircleOutlined />}
        onClick={handleXClick} /> */}
        <CloseCircleOutlined
          style={{ color: "black", fontSize: 20 }}
          onClick={handleXClick}
        />
        <Button onClick={handleResetClick}>Reset</Button>
        <Modal
          title="Are you sure you want to exit the game?"
          visible={exitModal}
          onOk={() => navigate("/")}
          onCancel={() => setExitModal(false)}
        ></Modal>
        <div className="game-run__box">
          {isVisible && (
            <div>
              <p>{`${entries[currentIndex][0]} :`}</p>
              <p> {`  ${entries[currentIndex][1]}`}</p>
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
