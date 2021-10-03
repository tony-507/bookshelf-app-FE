import { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

import { errorHelper, okHelper } from './../common/helper'
import { fetchBookApi } from './bookDetailApi'

// Dev path
// const accountURL = 'http://localhost:5000/accounts/'
// const bookURL = 'http://localhost:5000/books/'

// Prod path
const accountURL = 'https://bkbe.herokuapp.com/accounts/'
const bookURL = 'https://bkbe.herokuapp.com/books/'

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

export const checkLogout = () => {
  axios
    .get(accountURL + 'logout', {withCredentials: true})
    .then(response => {
      console.log(response.data)
    })
    .catch(err => {console.log(`${err}`)})
}

// Validating login and set cookies

const setCookie = (username: string, role: string) => {
  axios
    .get(accountURL + 'cookie', {
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
    .post(bookURL + `status/id/${props.id}/${props.username}`)
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
    .post(bookURL+`status/id/${props.id}`)
    .then(response => {
      console.log(response.data)

      fetchAllBooks({setBooks: props.bookDbUI.setBooks, setLoading: props.bookDbUI.setLoading})
    })
    .catch(err => {console.error(`There was an error returning the book ${props.title}: ${err}`)})
}
interface BookInstance {
  author: string;
  title: string;
  rating: string;
  status: string;
  genre: string;
  desc: string;
}
interface bookCreateUI {
  bookInstance: BookInstance;
  bookDbUI: bookDbUI;
}

// Update book records
export const createBook = (props: bookCreateUI) => {
  // Send POST request to 'books/create' endpoint
  axios
  .post(bookURL+'create', {
    author: props.bookInstance.author,
    title: props.bookInstance.title,
    rating: props.bookInstance.rating,
    genre: props.bookInstance.genre,
    status: props.bookInstance.status,
    desc: props.bookInstance.desc
  })
  .then(res => {
    console.log(res.data)

    // Fetch all books to refresh
    // the books on the bookshelf list
    fetchAllBooks(props.bookDbUI)
  })
  .catch(error => console.error(`There was an error creating the ${props.bookInstance.title} book: ${error}`))
}

interface bookRemoveUI {
	id: number;
	title: string;
	bookDbUI: bookDbUI;
}

export const removeBook = (props: bookRemoveUI) => {
  axios
	.put(bookURL + 'delete', { id: props.id })
	.then(() => {
	console.log(`Book ${props.title} removed.`)

	// Fetch all books to refresh
	// the books on the bookshelf list
	fetchAllBooks(props.bookDbUI)
	})
	.catch(error => console.error(`There was an error removing the ${props.title} book: ${error}`))
}

export const resetBook = (props: bookDbUI) => {
  axios.put(bookURL + 'reset')
    .then(() => {
      // Fetch all books to refresh
      // the books on the bookshelf list
      fetchAllBooks(props)
    })
    .catch(error => console.error(`There was an error resetting the book list: ${error}`))
}

// Filtering api
interface topFiveUI {
  type: string;
  setList: Dispatch<SetStateAction<string[]>>;
}

export const getTopFive = (props: topFiveUI) => {
  axios
  	.get(bookURL + 'top5',{
  	  params: {type: props.type}
  	})
  	.then(response => {
  	  const responseArray = response.data.reduce((cur: string[],next: Record<string,string>) => [...cur,next[props.type]],[])
  	  props.setList(responseArray)
  	})
  	.catch(err => console.error(`Error in retrieveing ${props.type}: ${err}`))
}

interface filterUI {
  selectedRating: string[];
  selectedStatus: string[];
  selectedGenre: string[];
  username: string;
  notOnShelf: boolean;
  setBooks: Dispatch<SetStateAction<BookUI[]>>;
}

export const applyFilter = (props: filterUI) => {
  axios
  	.get(bookURL + 'filter', {
  	  params: {
  	  	selectedRating: props.selectedRating,
  	  	selectedStatus: props.selectedStatus,
  	  	selectedGenre: props.selectedGenre,
  	  	username: props.username,
  	  	notOnShelf: props.notOnShelf
  	 }
  	})
  	.then(response => {
  	  props.setBooks(response.data)
  	})
  	.catch(err => console.error(`Error in filtering books: ${err}`))
}

// Book detail
const fetchBook = fetchBookApi(bookURL)
export {fetchBook}