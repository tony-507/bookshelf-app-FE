import React, { Dispatch, SetStateAction } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'

// Translation


import { checkLogout } from './../api/index'
import LoginPopup from './../login/index'
import './style.css'

interface navbarUI {
  accountCredentials: {
    auth: string;
    setAuth: Dispatch<SetStateAction<string>>;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
  };
}

export const Navbar = (props: navbarUI) => {
  const { formatMessage, locale } = useIntl()
  let history = useHistory()

  const redirectLogin = () => {history.push('/')}

  const handleLogout = () => {
    props.accountCredentials.setAuth("")
    props.accountCredentials.setPassword("")
    props.accountCredentials.setUsername("")
    checkLogout(props.accountCredentials.username, props.accountCredentials.auth)
    redirectLogin()
  }

  const handleLoginPop = () => {
    let popup: HTMLElement | null = document.getElementById("login-popup")
    if (popup) {
      popup.style.display = "block"
    }
  }

  const handleLang = () => {
    if (locale === "en") {
      window.location.pathname = window.location.pathname.replace("en", "zh")
    }
    else {
      window.location.pathname = window.location.pathname.replace("zh", "en")
    }
  }

  const head = () => (
    <div>
      <ul className="nav-ul">
        <li className="nav-welcome">
          <h1><button onClick={redirectLogin} className="app-title">
            {formatMessage({ id: "app_title" || "Book Management System"})}
          </button></h1>
        </li>
        <li className="nav-btn">
          <button className="log-btn" onClick={handleLang} >
            {formatMessage({ id: "changeLang" || "changeLang"})}
          </button>
        </li>
      </ul>
      <hr />
    </div>
  )

  if (props.accountCredentials.auth === "user")
  	return (
      <div className="page-view">

        {head()}

        <ul className="nav-ul">
          <li className="nav-welcome">
            <p>{formatMessage({ id: "welcomeMessage" || "Welcome "})}{props.accountCredentials.username}!</p>
          </li>
          <li className="nav-btn"><button className="log-btn" onClick={handleLogout} >
            {formatMessage({ id: "logoutBtn" || "Logout"})}
          </button></li>
        </ul>
	  </div>
	)
  else if (props.accountCredentials.auth === "admin")
  	return (
  	  <div className="page-view">

        {head()}

  	    <ul className="nav-ul">
          <li className="nav-welcome">
            <p>{formatMessage({ id: "welcomeMessage" || "Welcome "})}{props.accountCredentials.username}!</p>
          </li>
          <li className="nav-btn"><button className="log-btn" onClick={handleLogout} >
            {formatMessage({ id: "logoutBtn" || "Logout"})}
          </button></li>
        </ul>
	  </div>
  	)
  else
  	return (
  	  <div className="page-view">

        {head()}

  	    <ul className="nav-ul">
  	      <li className="nav-welcome">
            <p>{formatMessage({ id: "loginPrompt" || "Please login to proceed"})}</p>
          </li>
          <li className="nav-btn"><button className="log-btn" onClick={handleLoginPop} >
            {formatMessage({ id: "loginBtn" || "Login"})}
          </button></li>
  	    </ul>

        <div className="modal" id="login-popup">
          <LoginPopup accountCredentials={props.accountCredentials} />
        </div>
	  </div>
  	)
}