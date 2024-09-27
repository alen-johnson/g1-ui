import { CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const JoinModal = ({ isOpen, closeModal }) => {
  return (
    <div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-close_btn">
              <CloseCircleOutlined onClick={closeModal} />
            </div>
            <div className="modal-div">
              <div className="modal-div_left">
                <p>Room Code</p>

                <Button>Start</Button>
              </div>
              <div className="modal-div_right">
                <p>Settings</p>
                <p>No. of imposters</p>
                <p>Categories</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinModal;
