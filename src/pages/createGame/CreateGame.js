import { Button } from 'antd'
import React from 'react'

function CreateGame() {
  return (
    <div className='create-game'>
        <div className='create-game__btns'>
            <Button>Create Game</Button>
            <Button>Join Game</Button>

        </div>
    </div>
  )
}

export default CreateGame