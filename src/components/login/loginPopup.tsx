import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { FormattedMessage } from 'react-intl'

import { validateLogin, registerAdd, checkExist } from './../api'
import { Error, Ok } from './../common/messages'
import { errorHandler, okHandler } from './../common/helper'

import './style.css';

interface loginPropsUI {
  accountCredentials: {
    auth: string;
    setAuth: Dispatch<SetStateAction<string>>;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
  }
}

export const LoginPopup = (props: loginPropsUI) => {
  const [confirmPassword,setConfirmPassword] = useState('')
  const [email,setEmail] = useState('')
  const [action, setAction] = useState('login')
  const [error, setError] = useState('')
  const [displayError, setDisplayError] = useState(false)
  const [ok, setOk] = useState('')
  const [displayOk, setDisplayOk] = useState(false)
  const {setAuth, username, setUsername, password, setPassword} = props.accountCredentials

  const errorHelper = errorHandler({setError: setError, setDisplayError: setDisplayError})
  const okHelper = okHandler({setOk: setOk, setDisplayOk: setDisplayOk})

  useEffect(() => {
    setAction('login')
  },[])

  const handleChange = () => {
    // Toggle between login and register

    if (action === "login") {
      // Login -> register
      setAction("register")
      setDisplayError(false)
      setConfirmPassword('')
      setEmail('')
    }
    else {
      // Register -> login
      setAction("login")
      setDisplayOk(false)
      setDisplayError(false)
    }
  }

  const handleLogin = () => {
    if (username !== '' && password !== '') {
      // Nonempty inputs, validate with BE
      validateLogin({
        username: username,
        password: password,
        setAuth: setAuth,
        errorDisplay: {setError: setError, setDisplayError: setDisplayError}
      })
    }
    else if (username === "")
      errorHelper('Username cannot be empty')
    else
      errorHelper('Password cannot be empty')
  }

  const checkAccountDetail = () => {
    // Function for basically checking validity of register info

    if (username === "" || password === "" || email === "") {
      errorHelper('Username, password and email cannot be empty')
      return false
    }
    else if (password.length < 8) {
      // Check password length (>=8)
      errorHelper('Password too short')
      return false
    }
    else if (password !== confirmPassword) {
      // Confirm password not the same
      errorHelper('Two passwords are not identical')
      return false
    }
    else {
      const isExist = checkExist(username)
      if (isExist !== null) {
        if (checkExist(username)) {
          errorHelper('Username exists already')
          return false
        }
        else
          return true
      }
      else
        return false
    }
  }

  const handleRegister = () => {
    if (checkAccountDetail()) {
      console.log('Account detail checked OK.')
      registerAdd({
        username: username,
        password: password,
        email: email,
        errorHelper: errorHelper,
        okHelper: okHelper
      })
    }
  }

  const handleClosePopup = () => {
    setDisplayError(false)
    setDisplayOk(false)
    let popup: HTMLElement | null = document.getElementById("login-popup")
    if (popup)
      popup.style.display = "none"
  }
  
  return(
    action === 'login'
      ? <div className="popup-view" id="login-form">
          <ul className="popup-nav">
            <li className="nav-message">
              <h2><FormattedMessage id="login_message" defaultMessage="login_message" /></h2>
            </li>
            <li className="nav-close">
              <button className="close" onClick={handleClosePopup}>&times;</button>
            </li>
          </ul>

          <Error display={displayError} message={error} />

          <Ok display={displayOk} message={ok} />

          <label className="form-label" htmlFor="username">
            <FormattedMessage id="username" defaultMessage="Username" />:
          </label>
          <input className="form-login" type="text" id="username" name="username" value={username} 
          onChange={(e) => setUsername(e.currentTarget.value)} />

          <label className="form-label" htmlFor="password">
            <FormattedMessage id="password" defaultMessage="Password" />:
          </label>
          <input className="form-login" type="password" id="password" name="password" value={password} 
          onChange={(e) => setPassword(e.currentTarget.value)} />

          <div className="login-btn-wrap">
            <span>
              <button onClick={handleLogin} className="login-btn">
                <FormattedMessage id="loginBtn" defaultMessage="Login" />
              </button>
            </span>
            <span>
              <button onClick={handleChange} className="login-btn">
                <FormattedMessage id="newUserBtn" defaultMessage="New?" />
              </button>
            </span>
          </div>
      </div>
      
      : <div className="popup-view" onSubmit={handleRegister} id="register-form">
          <ul className="popup-nav">
            <li className="nav-message">
              <h2><FormattedMessage id="Register message" defaultMessage="register_message" /></h2>
            </li>
            <li className="nav-close">
              <button className="close" onClick={handleClosePopup}>&times;</button>
            </li>
          </ul>

          <Error display={displayError} message={error} />

          <Ok display={displayOk} message={ok} />

          <label className="form-label" htmlFor="username">
            <FormattedMessage id="username" defaultMessage="Username" />:
          </label>
          <input className="form-login" type="text" id="username" name="username" value={username} 
          onChange={(e) => setUsername(e.currentTarget.value)} />

          <label className="form-label" htmlFor="password">
            <FormattedMessage id="password" defaultMessage="Password" /> 
            (<FormattedMessage id="pw_req" defaultMessage="pw_req" />):
          </label>
          <input className="form-login" type="password" id="password" name="password" value={password} 
          onChange={(e) => setPassword(e.currentTarget.value)} />

          <label className="form-label" htmlFor="confirmPassword">
            <FormattedMessage id="confirmPassword" defaultMessage="Input the password again" />:
          </label>
          <input className="form-login" type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.currentTarget.value)} />

          <label className="form-label" htmlFor="email">
            <FormattedMessage id="email" defaultMessage="Email" />:
          </label>
          <input className="form-login" type="text" id="email" name="email" value={email} 
          onChange={(e) => setEmail(e.currentTarget.value)} />

          <button onClick={handleChange} className="login-btn">
            <FormattedMessage id="existUserBtn" defaultMessage="Existing user?" />
          </button>
          <button onClick={handleRegister} className="login-btn">
            <FormattedMessage id="registerUserBtn" defaultMessage="Register" />
          </button>
      </div>
  );
}