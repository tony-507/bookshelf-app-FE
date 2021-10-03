import React, { Dispatch, SetStateAction } from 'react'
import { useHistory } from 'react-router-dom'
import {FormattedMessage} from 'react-intl'

// Translation
import en_gb from './../../i18n/en_gb'
import zh_hk from './../../i18n/zh_hk'

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
  setLocale: Dispatch<SetStateAction<string>>;
  locale: string;
  setMessages: Dispatch<SetStateAction<any>>;
  messageDisplay: {
    setError: Dispatch<SetStateAction<string>>;
    setDisplayError: Dispatch<SetStateAction<boolean>>;
    setOk: Dispatch<SetStateAction<string>>;
    setDisplayOk: Dispatch<SetStateAction<boolean>>;
  };
}

export const Navbar = (props: navbarUI) => {
  let history = useHistory()

  const redirectLogin = () => {history.push('/landing')}

  const handleLogout = () => {
    props.accountCredentials.setAuth("")
    props.accountCredentials.setPassword("")
    props.accountCredentials.setUsername("")
    checkLogout()
    redirectLogin()
  }

  const handleLoginPop = () => {
    let popup: HTMLElement | null = document.getElementById("login-popup")
    if (popup) {
      popup.style.display = "block"
    }
  }

  const handleLang = () => {
    if (props.locale === "en-gb") {
      props.setLocale("zh-hk")
      props.setMessages(zh_hk)
    }
    else {
      props.setLocale("en-gb")
      props.setMessages(en_gb)
    }
  }

  const head = () => (
    <div>
      <ul className="nav-ul">
        <li className="nav-welcome">
          <h1><button onClick={redirectLogin} className="app-title">
            <FormattedMessage id="app_title" defaultMessage="Book Management System" />
          </button></h1>
        </li>
        <li className="nav-btn">
          <button className="log-btn" onClick={handleLang} >
            <FormattedMessage id="changeLang" defaultMessage="Change Language" />
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
            <p><FormattedMessage id="welcomeMessage" defaultMessage="Welcome " />{props.accountCredentials.username}!</p>
          </li>
          <li className="nav-btn"><button className="log-btn" onClick={handleLogout} >
            <FormattedMessage id="logoutBtn" defaultMessage="Logout" />
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
            <p><FormattedMessage id="welcomeMessage" defaultMessage="Welcome " />{props.accountCredentials.username}!</p>
          </li>
          <li className="nav-btn"><button className="log-btn" onClick={handleLogout} >
            <FormattedMessage id="logoutBtn" defaultMessage="Logout" />
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
            <p><FormattedMessage id="loginPrompt" defaultMessage="Please login to proceed" /></p>
          </li>
          <li className="nav-btn"><button className="log-btn" onClick={handleLoginPop} >
            <FormattedMessage id="loginBtn" defaultMessage="Login" />
          </button></li>
  	    </ul>

        <div className="modal" id="login-popup">
          <LoginPopup messageDisplay={props.messageDisplay} accountCredentials={props.accountCredentials} />
        </div>
	  </div>
  	)
}