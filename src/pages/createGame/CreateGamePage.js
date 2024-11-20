import { Button } from 'antd'
import React, { useState } from 'react'
import { CreateModal, JoinModal} from "../../components/componentsIndex"

function CreateGamePage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isJoinOpen, setIsJoinOpen] = useState(false)

  const openCreateModal = () => {
    setIsCreateOpen(true)
  }
  const openJoinModal = () => {
    setIsJoinOpen(true)
  }
  const closeModal = () => {
    setIsCreateOpen(false)
    setIsJoinOpen(false)
  }
  return (
    <div className='create-game'>
        <div className='create-game__btns'>
            <Button onClick={openCreateModal}>Create Game</Button>
            {isCreateOpen && <CreateModal isOpen={isCreateOpen} closeModal={closeModal}/>}
            <Button onClick={openJoinModal}>Join Game</Button>
            {isJoinOpen && <JoinModal isOpen={isJoinOpen} closeModal={closeModal}/>}
        </div>
    </div>
  )
}

export default CreateGamePage