import { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

import { errorHelper, okHelper } from './../common/helper'

// Interfaces
interface errorUI {
  setDisplayError: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
}

interface okUI {
  setDisplayOk: Dispatch<SetStateAction<boolean>>;
  setOk: Dispatch<SetStateAction<string>>;
}

interface registerUI {
  username: string;
  password: string;
  email: string;
  errorDisplay: errorUI;
  okDisplay: okUI;
}

// APIs
export const registerAddApi = (accountURL: string) => (props: registerUI) => {
  axios
    .post(accountURL + 'new', {
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