import React, { useEffect, useState } from "react";
import "./GameRunPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Drawer, Modal, Select } from "antd";
import { StepForwardOutlined } from "@ant-design/icons";
import {
  ResultModal,
  ScoreboardDrawer,
} from "../../components/componentsIndex";
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
  const handleXClick = () => {
    setExitModal(true);
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

  const showScoreboard = () => {
    setOpenScore(!openScore);
  };

  const endSession = () => {
    setOpenSession(!openSession);
  };

  return (
    <div className="game-run">
      <div className="game-run__side">
        <button className="game-run__menu-btn" onClick={handleXClick}>
          <span className="game-run__menu-icon">
            <svg viewBox="0 0 175 80" width="40" height="40">
              <rect width="80" height="15" fill="#f0f0f0" rx="10"></rect>
              <rect y="30" width="80" height="15" fill="#f0f0f0" rx="10"></rect>
              <rect y="60" width="80" height="15" fill="#f0f0f0" rx="10"></rect>
            </svg>
          </span>
          <span className="game-run__menu-text">MENU</span>
        </button>
        <Modal
          title="Exit to main menu?"
          visible={exitModal}
          onOk={() => navigate("/")}
          onCancel={() => setExitModal(false)}
          okText="Yes"
          cancelText="No"
          cancelButtonProps={{ className: "" }}
          okButtonProps={{ className: "" }}
          mask={true} // Enables the mask background
          maskClosable={false} // Prevents closing modal on mask click
          maskStyle={{ backgroundColor: "rgba(0, 0, 0, .7)" }}
        />
        <div className="game-run__scoreboard">
          <button onClick={showScoreboard}>
            <span class="label">Scoreboard</span>
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                ></path>
              </svg>
            </span>
          </button>
          <Drawer
            title="Scoreboard"
            onClose={showScoreboard}
            open={openScore}
            placement="left"
          >
            <ScoreboardDrawer {...scores} />
          </Drawer>
        </div>
        <div className="game-run__scoreboard">
          <button onClick={endSession}>
            <span class="label">End Session</span>
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <Modal
          title="END GAME"
          centered
          open={openSession}
          okText="End Game"
          onOk={() => {
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }}
          cancelText="Continue Playing"
          onCancel={endSession}
          mask={true} // Enables the mask background
          maskClosable={false} // Prevents closing modal on mask click
          maskStyle={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
          width={800}
          styles={{ height: 300, overflowY: "auto" }}
        >
          <ResultModal {...scores} />
        </Modal>
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
