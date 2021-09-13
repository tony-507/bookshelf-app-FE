import React, { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

import { errorHelper } from './../common/helper'

const interfaceURL = 'http://localhost:5000/accounts/'

const setCookie = (username: string, role: string) => {
  axios
    .get(interfaceURL + 'createCookie', {
      params: {
        username: username,
        role: role
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data)
    })
}

interface loginUI {
  username: string;
  password: string;
  setAuth: Dispatch<SetStateAction<string>>;
  errorDisplay: {
	setDisplayError: Dispatch<SetStateAction<boolean>>;
	setError: Dispatch<SetStateAction<string>>;
  }
}

export const validateLogin = (props: loginUI) => {
  axios
    .get(interfaceURL + 'check', {
      params: {
        username: props.username,
        password: props.password
      },
      withCredentials: true
    })
    .then(response => {
      if (response.data.length > 0) {
        if (response.data[0].role === 'user') {
          props.errorDisplay.setDisplayError(false)
          props.setAuth('user')
          setCookie(props.username, 'user')
        }
        else if (response.data[0].role === 'admin') {
          props.errorDisplay.setDisplayError(false)
          props.setAuth('admin')
          setCookie(props.username, 'admin')
        }
      }
      else {
        errorHelper({errorDisplay: props.errorDisplay,
          errorMessage: 'Wrong username or password'
        })
      }
    })
    .catch(err => console.log(`${err}`))
}