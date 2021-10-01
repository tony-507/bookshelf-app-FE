import React, { useState, Dispatch, SetStateAction } from 'react'
import { FormattedMessage } from 'react-intl'

import StaffPage from './../admin/index'
import UserPage from './../user/index'
import { validateLogin, registerAdd } from './../api/index'
import { errorHelper } from './../common/helper'

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
  const {auth, setAuth, username, setUsername, password, setPassword} = props.accountCredentials
  const {setError, setDisplayError, setOk, setDisplayOk} = props.messageDisplay

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
    else if (username === ""){
      errorHelper({errorDisplay: {setError: setError, setDisplayError: setDisplayError},
        errorMessage: 'Username cannot be empty'
      })
    }
    else {
      errorHelper({errorDisplay: {setError: setError, setDisplayError: setDisplayError},
        errorMessage: 'Password cannot be empty'
      })
    }
  }

  const checkAccountDetail = () => {
    // Function for basically checking validity of register info

    if (username === "" || password === "" || email === "") {
      errorHelper({errorDisplay: {setError: setError, setDisplayError: setDisplayError},
        errorMessage: 'Username, password and email cannot be empty'
      })
      return false
    }
    else if (password.length < 8) {
      // Check password length (>=8)
      errorHelper({errorDisplay: {setError: setError, setDisplayError: setDisplayError},
        errorMessage: 'Password too short'
      })
      return false
    }
    else if (password !== confirmPassword) {
      // Confirm password not the same
      errorHelper({errorDisplay: {setError: setError, setDisplayError: setDisplayError},
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
        username: username,
        password: password,
        email: email,
        errorDisplay: {setError: setError, setDisplayError: setDisplayError},
        okDisplay: {setOk: setOk, setDisplayOk: setDisplayOk}
      })
    }
  }

  if (auth === 'admin')
    return(
      <div className="page-view">

        <StaffPage />
      </div>
    );
  else if (auth ==='user')
    return(
      <div className="page-view">
        <UserPage username={username} />
      </div>
    );
  else
    return(
      action === 'login'
        ? <div className="page-view" onSubmit={handleLogin} id="form-login">
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

            <button onClick={handleLogin} className="login-btn">
              <FormattedMessage id="loginBtn" defaultMessage="Login" />
            </button>
            <button onClick={handleChange} className="login-btn">
              <FormattedMessage id="newUserBtn" defaultMessage="New?" />
            </button>
        </div>
        
        : <div className="page-view" onSubmit={handleRegister} id="form-register">
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
              <FormattedMessage id="confirmPassword" defaultMessage="Input the password again" /> :
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

export default FirstPage