import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { FormattedMessage } from 'react-intl'

import StaffPage from './../admin/index'
import UserPage from './../user/index'
import { validateLogin, registerAdd } from './../api/index'
import { errorHelper, okHelper } from './../common/helper'

import './style.css';

interface loginPropsUI {
  messageDisplay: {
    setError: Dispatch<SetStateAction<string>>;
    setDisplayError: Dispatch<SetStateAction<boolean>>;
    setOk: Dispatch<SetStateAction<string>>;
    setDisplayOk: Dispatch<SetStateAction<boolean>>;
  };
  accountCredentials: {
    auth: string;
    setAuth: Dispatch<SetStateAction<string>>;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
  };
}

const FirstPage = (props: loginPropsUI) => {
  const [confirmPassword,setConfirmPassword] = useState('')
  const [email,setEmail] = useState('')
  const [action, setAction] = useState('login')
  const errorDisplay = {
    setError: props.messageDisplay.setError,
    setDisplayError: props.messageDisplay.setDisplayError
  }
  const okDisplay = {
    setOk: props.messageDisplay.setOk,
    setDisplayOk: props.messageDisplay.setDisplayOk
  }

  const resetEverything = () => {
    props.accountCredentials.setUsername('')
    props.accountCredentials.setPassword('')
    setEmail('')
    setAction('login')
    props.messageDisplay.setDisplayError(false)
    props.messageDisplay.setDisplayOk(false)
  }

  useEffect(() => {
    if (props.accountCredentials.auth==='')
      resetEverything()
  }, [])

  const handleChange = () => {
    // Toggle between login and register

    if (action === "login") {
      // Login -> register
      setAction("register")
      props.messageDisplay.setDisplayError(false)
      setConfirmPassword('')
      setEmail('')
    }
    else {
      // Register -> login
      setAction("login")
      props.messageDisplay.setDisplayOk(false)
      props.messageDisplay.setDisplayError(false)
    }
  }

  const handleLogin = () => {
    if (props.accountCredentials.username !== '' && props.accountCredentials.password !== '') {
      // Nonempty inputs, validate with BE
      validateLogin({
        username: props.accountCredentials.username,
        password: props.accountCredentials.password,
        setAuth: props.accountCredentials.setAuth,
        errorDisplay: errorDisplay
      })
    }
    else if (props.accountCredentials.username === ""){
      errorHelper({errorDisplay: errorDisplay,
        errorMessage: 'Username cannot be empty'
      })
    }
    else {
      errorHelper({errorDisplay: errorDisplay,
        errorMessage: 'Password cannot be empty'
      })
    }
  }

  const checkAccountDetail = () => {
    // Function for basically checking validity of register info

    if (props.accountCredentials.username === "" || props.accountCredentials.password === "" || email === "") {
      errorHelper({errorDisplay: errorDisplay,
        errorMessage: 'Username, password and email cannot be empty'
      })
      return false
    }
    else if (props.accountCredentials.password.length < 8) {
      // Check password length (>=8)
      errorHelper({errorDisplay: errorDisplay,
        errorMessage: 'Password too short'
      })
      return false
    }
    else if (props.accountCredentials.password !== confirmPassword) {
      // Confirm password not the same
      errorHelper({errorDisplay: errorDisplay,
        errorMessage: 'Two passwords are not identical'
      })
      return false
    }
    else
      return true
  }

  const handleRegister = () => {
    if (checkAccountDetail()) {
      console.log('Account detail checked OK.')
      registerAdd({
        username: props.accountCredentials.username,
        password: props.accountCredentials.password,
        email: email,
        errorDisplay: errorDisplay,
        okDisplay: okDisplay
      })
    }
  }

  if (props.accountCredentials.auth === 'admin')
    return(
      <div className="page-view">

        <StaffPage />
      </div>
    );
  else if (props.accountCredentials.auth ==='user')
    return(
      <div className="page-view">
        <UserPage username={props.accountCredentials.username} />
      </div>
    );
  else
    return(
      action === 'login'
        ? <div className="page-view" onSubmit={handleLogin} id="form-login">
            <label className="form-label" htmlFor="props.accountCredentials.username">
              <FormattedMessage id="username" defaultMessage="Username" />:
            </label>
            <input className="form-login" type="text" id="username" name="username" value={props.accountCredentials.username} 
            onChange={(e) => props.accountCredentials.setUsername(e.currentTarget.value)} />

            <label className="form-label" htmlFor="props.accountCredentials.password">
              <FormattedMessage id="password" defaultMessage="Password" />:
            </label>
            <input className="form-login" type="password" id="password" name="password" value={props.accountCredentials.password} 
            onChange={(e) => props.accountCredentials.setPassword(e.currentTarget.value)} />

            <button onClick={handleLogin} className="login-btn">
              <FormattedMessage id="loginBtn" defaultMessage="Login" />
            </button>
            <button onClick={handleChange} className="login-btn">
              <FormattedMessage id="newUserBtn" defaultMessage="New?" />
            </button>
        </div>
        
        : <div className="page-view" onSubmit={handleRegister} id="form-register">
            <label className="form-label" htmlFor="props.accountCredentials.username">
              <FormattedMessage id="username" defaultMessage="Username" />:
            </label>
            <input className="form-login" type="text" id="username" name="username" value={props.accountCredentials.username} 
            onChange={(e) => props.accountCredentials.setUsername(e.currentTarget.value)} />

            <label className="form-label" htmlFor="props.accountCredentials.password">
              <FormattedMessage id="password" defaultMessage="Password" /> 
              (<FormattedMessage id="pw_req" defaultMessage="at least 8 characters long" />):
            </label>
            <input className="form-login" type="password" id="password" name="password" value={props.accountCredentials.password} 
            onChange={(e) => props.accountCredentials.setPassword(e.currentTarget.value)} />

            <label className="form-label" htmlFor="confirmPassword">
              <FormattedMessage id="confirmPassword" defaultMessage="Input the password again" /> :
            </label>
            <input className="form-login" type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.currentTarget.value)} />

            <label className="form-label" htmlFor="email">Email:</label>
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

export default FirstPage