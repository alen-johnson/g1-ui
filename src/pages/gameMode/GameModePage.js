import { useNavigate } from "react-router-dom";
import { StartModal } from "../../components/componentsIndex";
import "./GameModePage.css";

import React, { useState } from "react";
import { Modal } from "antd";

function GameModePage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const handleMutliClick = () => {
    navigate("/creategame");
  };
  return (
    <div className="game-mode">
      <div className="game-mode__display-area">
        <p onClick={openModal}>Single System Mode</p>
        <Modal
          open={isOpen}
          onCancel={openModal}
          mask={true} // Enables the mask background
          maskClosable={false} // Prevents closing modal on mask click
          maskStyle={{ backgroundColor: "rgba(0, 0, 0, .8)" }}
          width={800}
          bodyStyle={{ height: 520, overflowY: "auto" }}
          footer= {null}
        >
          <StartModal />
        </Modal>

        <p
        // onClick={handleMutliClick}
        >
          Multi System Mode
        </p>
      </div>
    </div>
  );
}

export default GameModePage;
