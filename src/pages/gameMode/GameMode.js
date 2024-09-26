import { useNavigate } from "react-router-dom"
import { StartModal } from "../../components/componentsIndex"
import "./GameMode.css"

import React, { useState } from 'react'

function GameMode() {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    
    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    const handleMutliClick = () => {
        navigate("/creategame")
    }
  return (
    <div className="game-mode">
        <div className="game-mode__display-area">
            <p onClick={openModal}>Single System Mode</p>
            {isOpen && <StartModal isOpen={isOpen} closeModal={closeModal}/>}
            <p onClick={handleMutliClick}>Multi System Mode</p>
        </div>
    </div>
  )
}

export default GameMode