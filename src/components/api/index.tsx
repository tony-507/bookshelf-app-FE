import { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

import { errorHelper, okHelper } from './../common/helper'

const accountURL = 'http://localhost:5000/accounts/'
const bookURL = 'http://localhost:5000/books/'

interface errorUI {
  setDisplayError: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
}
interface okUI {
  setDisplayOk: Dispatch<SetStateAction<boolean>>;
  setOk: Dispatch<SetStateAction<string>>;
}

// Getting cookie for session

interface sessionUI {
  setAuth: Dispatch<SetStateAction<string>>;
  setUsername: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
}
export const checkLogin = (props: sessionUI) => {
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

// Validating login and set cookies

const setCookie = (username: string, role: string) => {
  axios
    .get(accountURL + 'createCookie', {
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
  errorDisplay: errorUI;
}
export const validateLogin = (props: loginUI) => {
  axios
    .get(accountURL + 'check', {
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

// Registering a new account

interface registerUI {
  username: string;
  password: string;
  email: string;
  errorDisplay: errorUI;
  okDisplay: okUI;
}
// Need a registerCheck here after changing to REST api
export const registerAdd = (props: registerUI) => {
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

// Fetching all books
interface BookUI {
  id: number;
  author: string;
  title: string;
  rating: string;
  status: string;
  genre: string;
  desc: string;
}
interface bookDbUI {
  setBooks: Dispatch<SetStateAction<BookUI[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const fetchAllBooks = (props: bookDbUI) => {
  axios
    .get(bookURL + 'all')
    .then(response => {
      // Update the books state
      props.setBooks(response.data)

      // Update loading state
      props.setLoading(false)
    })
    .catch(error => {
    	console.error(`There was an error retrieving the book list: ${error}`)
    })
}

interface borrowUI {
	id: number;
	title: string;
	username: string;
	bookDbUI: bookDbUI;
}
export const borrowBook = (props: borrowUI) => {
  axios
    .post(bookURL + 'borrow', {id: props.id, username: props.username})
    .then(response => {
      console.log(response.data)

      fetchAllBooks({setBooks: props.bookDbUI.setBooks, setLoading: props.bookDbUI.setLoading})
    })
    .catch(err => {console.error(`There was an error borrowing the book ${props.title}: ${err}`)})
}

interface returnUI {
	id: number;
	title: string;
	bookDbUI: bookDbUI;
}
export const returnBook = (props: returnUI) => {
  axios
    .post(bookURL+'return', {id: props.id})
    .then(response => {
      console.log(response.data)

      fetchAllBooks({setBooks: props.bookDbUI.setBooks, setLoading: props.bookDbUI.setLoading})
    })
    .catch(err => {console.error(`There was an error borrowing the book ${props.title}: ${err}`)})
}


