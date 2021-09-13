import React, { Dispatch, SetStateAction } from 'react'

interface errorUI {
  errorDisplay: {
    setError: Dispatch<SetStateAction<string>>;
    setDisplayError: Dispatch<SetStateAction<boolean>>;
  },
  errorMessage: string;
}

interface okUI {
  okDisplay: {
    setOk: Dispatch<SetStateAction<string>>;
    setDisplayOk: Dispatch<SetStateAction<boolean>>;
  },
  okMessage: string;
}

export const errorHelper = (props: errorUI) => {
  props.errorDisplay.setDisplayError(true)
  props.errorDisplay.setError(props.errorMessage)
}

export const okHelper = (props: okUI) => {
  props.okDisplay.setDisplayOk(true)
  props.okDisplay.setOk(props.okMessage)
}