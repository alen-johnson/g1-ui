import { Switch } from 'antd'
import React from 'react'

function Settings() {
  return (
    <div className='settings'>
        <Switch
        checkedChildren="Dark Mode"
        unCheckedChildren="Light Mode"/>
    </div>
  )
}

export default Settings