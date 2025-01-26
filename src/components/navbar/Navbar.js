import "./Navbar.css";
import { Drawer, Modal } from "antd";
import React, { useState } from "react";
import { ResultModal, ScoreboardDrawer } from "../componentsIndex";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import HomeIcon from "@mui/icons-material/Home";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";

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

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
    console.log("clicked");
  };

  return (
    <div className="navbar">
      <div className="navbar__menu">
  <input
    className="navbar__menu-checkbox"
    type="checkbox"
    checked={isChecked}
  />
  <span
    className={`navbar__menu-button ${isChecked ? "active" : ""}`}
    onClick={handleToggle}
  ></span>
  <button
    className={`navbar__menu-option navbar__option-a ${isChecked ? "active" : ""}`}
    onClick={handleXClick}
  >
    <HomeIcon />
    <span className="tooltip">Home</span>
  </button>
  <button
    className={`navbar__menu-option navbar__option-b ${isChecked ? "active" : ""}`}
    onClick={showScoreboard}
  >
    <SportsScoreIcon />
    <span className="tooltip">Scoreboard</span> 
  </button>
  <button
    className={`navbar__menu-option navbar__option-c ${isChecked ? "active" : ""}`}
    onClick={endSession}
  >
    <PowerSettingsNewOutlinedIcon />
    <span className="tooltip">End Session</span> 
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
        mask={true}
        maskClosable={false}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, .7)" }}
      />
      <Drawer
        title="Scoreboard"
        onClose={showScoreboard}
        open={openScore}
        placement="left"
      >
        <ScoreboardDrawer {...scores} />
      </Drawer>
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
        mask={true}
        maskClosable={false}
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
