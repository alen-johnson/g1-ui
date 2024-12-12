import "./Navbar.css";
import { Drawer, Modal } from "antd";
import React from "react";
import { ResultModal, ScoreboardDrawer } from "../componentsIndex";

const Navbar = ({
  scores,
  exitModal,
  setExitModal,
  openScore,
  setOpenScore,
  openSession,
  setOpenSession,
  navigate,
}) => {
  const showScoreboard = () => {
    setOpenScore(!openScore);
  };

  const endSession = () => {
    setOpenSession(!openSession);
  };

  const handleXClick = () => {
    setExitModal(true);
  };
  return (
    <div>
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
  );
};

export default Navbar;
