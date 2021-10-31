import { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

import { errorHandler } from './../common/helper'

// Interfaces
interface errorUI {
  setDisplayError: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
}

interface sessionUI {
  setAuth: Dispatch<SetStateAction<string>>;
  setUsername: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
}

interface loginUI {
  username: string;
  password: string;
  setAuth: Dispatch<SetStateAction<string>>;
  errorDisplay: errorUI;
}

// APIs
export const checkLoginApi = (accountURL: string) => (props: sessionUI) => {
  axios
    .get(accountURL + 'login', { withCredentials: true})
    .then(response => {
      if (response.data.username && response.data.role) {
      	props.setAuth(response.data.role)
      	props.setUsername(response.data.username)
      }
      else {
      	props.setAuth('')
      	props.setUsername('')
      	props.setPassword('')
      }
    })
}

export const checkLogoutApi = (accountURL: string) => (username: string, role: string) => {
  axios
    .get(accountURL + `logout/${role}/${username}`, {withCredentials: true})
    .then(response => {
      console.log(response.data)
    })
    .catch(err => {console.log(`${err}`)})
}

// Validating login and set cookies
const setCookie = (accountURL:string) => (username: string, role: string) => {
  axios
    .get(accountURL + `cookie/${role}/${username}`, {withCredentials: true})
    .then(response => {
      console.log(response.data)
    })
}

export const validateLoginApi = (accountURL: string) => (props: loginUI) => {
  const errorHelper = errorHandler({setError: props.errorDisplay.setError, setDisplayError: props.errorDisplay.setDisplayError})
  
  axios
    .get(accountURL + `existence/${props.username}/${props.password}`, {withCredentials: true})
    .then(response => {
      console.log(response.data)
      if (response.data.length > 0) {
        if (response.data[0].role === 'user') {
          props.errorDisplay.setDisplayError(false)
          props.setAuth('user')
          setCookie(accountURL)(props.username, 'user')
        }
        else if (response.data[0].role === 'admin') {
          props.errorDisplay.setDisplayError(false)
          props.setAuth('admin')
          setCookie(accountURL)(props.username, 'admin')
        }
      }
      else {
        errorHelper('Wrong username or password')
      }
    })
    .catch(err => console.log(`${err}`))
}