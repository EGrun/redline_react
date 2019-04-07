import React from 'react'
import otterLogoSm from '../assets/otterLogos/2055854-200.png'
import avatarSm from '../assets/avatar_2019-04-07/avatar.jpg'

const AdminBar = (props) => {
    const adminBar = {
        maxWidth: '100vw',
        height: '4.35vh',
        backgroundColor: '#2c0f56',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '.5em',
    }

    const logoContainer = {
      display: 'flex',
      height: '4.35vh',
    }

    const logoStyle = {
        height: '2vh',
        alignSelf: 'center',
    }

    const OTR = {
      marginLeft: ".4em",
      fontWeight: "bold",
      fontFamily: "PlayfairDisplay",
      fontSize: "1rem",
      alignSelf: "center",
      letterSpacing: '2px',
      color: '#ffffff',
    }

    const userContainer = {
      display: 'flex',
    }

    const avatar = {
      justifySelf: 'flex-end',
      height: '60%',
      objectFit: 'contain',
    }

    const username = {
      color: "#eeeeee",
      alignSelf: 'center',
      marginRight: '.4em'
    }

    return (
      <div style={adminBar}>
        <span syle={logoContainer}>
          <img src = {otterLogoSm} style ={logoStyle} alt = 'logo' />
          <span style ={OTR} >OTR</span>
        </span>
        <span style={userContainer}>
          <span style = {username}>Hi User</span>
          <img src = {avatarSm} style = {avatar} alt = 'avatar' />
        </span>
      </div>
  )
}

export default AdminBar