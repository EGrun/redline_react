import React from 'react'
import otterLogo from '../assets/otter_logo.png'

const AdminBar = (props) => {
    const adminBar = {
        width: '100vw',
        height: '4.35vh',
        backgroundColor: '#2c0f56',
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
    }
    const logoStyle = {
        height: '3vh'
    }
    

    return (
      <div style={adminBar}>
        <img src = {otterLogo} style ={logoStyle} alt = 'logo' />
        <p></p>
      </div>
  )
}

export default AdminBar