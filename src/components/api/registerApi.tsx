import axios from 'axios'

// Interfaces
interface registerUI {
  username: string;
  password: string;
  email: string;
  errorHelper: (username: string, setDisplay?: boolean) => void;
  okHelper: (username: string, setDisplay?: boolean) => void;
}

// APIs
export const registerAddApi = (accountURL: string) => (props: registerUI) => {
  axios
    .post(accountURL + `new/${props.username}/${props.password}/${props.email}`)
    .then(res => {
      console.log(res.data)
      // Refresh with a success message
      props.errorHelper('',false)
      props.okHelper('Account created successfully')
    })
    .catch(err => {
      console.error(`${err}`)
      props.errorHelper('Error in account creation')
    })
}

export const checkExistApi = (accountURL: string) => (username: string): boolean => {
  axios
    .get(accountURL + `/existence/${username}`)
    .then(res => {return res.data.length > 0 ? true : false})
    .catch(err => {
      console.error(err)
      return true
    })

  return true
}