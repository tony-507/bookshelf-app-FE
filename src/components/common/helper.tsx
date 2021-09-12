import React, { Dispatch, SetStateAction } from 'react'

interface errorUI {
  setError: Dispatch<SetStateAction<string>>;
  setDisplayError: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
}

interface okUI {
  setOk: Dispatch<SetStateAction<string>>;
  setDisplayOk: Dispatch<SetStateAction<boolean>>;
  okMessage: string;
}

export const errorHelper = (props: errorUI) => {
  props.setDisplayError(true)
  props.setError(props.errorMessage)
}

export const okHelper = (props: okUI) => {
  props.setDisplayOk(true)
  props.setOk(props.okMessage)
}