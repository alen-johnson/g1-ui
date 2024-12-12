import { Switch } from 'antd'
import React, { useContext } from 'react'
import { MusicContext } from '../../context/musicContext';

function SettingsPage() {
  const { isPlaying, toggleMusic } = useContext(MusicContext);
  return (
    <div className='settings'>
        <h2>Settings</h2>
      <Switch
        checked={isPlaying}
        onChange={toggleMusic}
        checkedChildren="Music On"
        unCheckedChildren="Music Off"
      />

    </div>
  )
}

export default SettingsPage