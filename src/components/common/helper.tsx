import { Dispatch, SetStateAction } from 'react'

interface errorUI {
  setError: Dispatch<SetStateAction<string>>;
  setDisplayError: Dispatch<SetStateAction<boolean>>;
}

interface okUI {
  setOk: Dispatch<SetStateAction<string>>;
  setDisplayOk: Dispatch<SetStateAction<boolean>>;
}

export const errorHandler = (props: errorUI) => (message: string, setDisplay: boolean = true) => {
  props.setDisplayError(setDisplay)
  props.setError(message)
}

export const okHandler = (props: okUI) => (message: string, setDisplay: boolean = true) => {
  props.setDisplayOk(setDisplay)
  props.setOk(message)
}