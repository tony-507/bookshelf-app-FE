import { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

import { errorHelper, okHelper } from './../common/helper'

interface registerUI {
  username: string;
  password: string;
  email: string;
  errorDisplay: {
  setDisplayError: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  };
  okDisplay: {
  setDisplayOk: Dispatch<SetStateAction<boolean>>;
  setOk: Dispatch<SetStateAction<string>>;
  }
}

const interfaceURL = 'http://localhost:5000/accounts/'

// Need a registerCheck here after changing to REST api

export const registerAdd = (props: registerUI) => {
  axios
    .post(interfaceURL + 'new', {
      username: props.username,
      password: props.password,
      email: props.email
    })
    .then(res => {
      console.log(res.data)
      // Refresh with a success message
      props.errorDisplay.setDisplayError(false)
      okHelper({okDisplay: props.okDisplay,
        okMessage: 'Account created successfully'
      })
    })
    .catch(err => {
      console.error(`${err}`)
      errorHelper({errorDisplay: props.errorDisplay,
        errorMessage: 'Error in account creation'
      })
    })
}