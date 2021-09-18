import React, { Dispatch, SetStateAction } from 'react'
import {FormattedMessage} from 'react-intl'

// Translation
import en_gb from './../../i18n/en_gb'
import zh_hk from './../../i18n/zh_hk'

import { checkLogout } from './../api/index'
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
}

export const Navbar = (props: navbarUI) => {

  const handleLogout = () => {
  	// Reset login detail
  	props.accountCredentials.setAuth('')
  	props.accountCredentials.setUsername('')
  	props.accountCredentials.setPassword('')
    // Also destroy session
    checkLogout()
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
          <h1><FormattedMessage id="app_title" defaultMessage="Book Management System" /></h1>
        </li>
        <li className="nav-btn">
          <button className="logout-btn" onClick={handleLang} >
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
          <li className="nav-btn"><button className="logout-btn" onClick={handleLogout} >
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
          <li className="nav-btn"><button className="logout-btn" onClick={handleLogout} >
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
  	    </ul>
	  </div>
  	)
}