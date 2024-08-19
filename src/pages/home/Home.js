import './Home.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    const handleStartCLick = () => {
        navigate('/gamerun')
    }
    const handleSettingClick = () => {
        navigate('/settings')
    }
    const handleHelpClick = () => {
        navigate('/help')
    }
  return (
    <div className='home'>
        <div className='home__display-area'>
            <p onClick={handleStartCLick}>Start Game</p>
            <p onClick={handleSettingClick}>Settings</p>
            <p onClick={handleHelpClick}>Help</p>
        </div>
    </div>
  )
}

export default Home