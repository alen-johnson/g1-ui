
import { useNavigate } from "react-router-dom"
import { Modal } from "../../components/componentsIndex"
import "./GameMode.css"

import React, { useState } from 'react'

function GameMode() {
    const [isOpen, setIsOpen] = useState(false)
    
    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false)
    }
  return (
    <div className="game-mode">
        <div className="game-mode__display-area">
            <p onClick={openModal}>Single System Mode</p>
            {isOpen && <Modal isOpen={isOpen} closeModal={closeModal}/>}
            <p>Multi System Mode</p>
        </div>
    </div>
  )
}

export default GameMode