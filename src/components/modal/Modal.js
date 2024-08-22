import { useNavigate } from "react-router-dom";
import "./Modal.css"
import React, { useState } from "react";

const Modal = ({ isOpen, closeModal }) => {
const navigate = useNavigate()
  const handleplay = () => {
    navigate("/gamerun")
    closeModal();
  };

  return (
    <div>
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
           <p>Select Number of players</p>
            
            <p>Select Category</p>
            <p>random</p>
           <button onClick={handleplay}>Start</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
