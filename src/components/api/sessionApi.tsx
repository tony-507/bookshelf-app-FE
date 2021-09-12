import React, { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

const interfaceURL = 'http://localhost:5000/'

interface sessionUI {
  setAuth: Dispatch<SetStateAction<string>>;
  setUsername: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
}

export const checkLogin = (props: sessionUI) => {
  axios
    .get(interfaceURL + 'accounts/login', { withCredentials: true})
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