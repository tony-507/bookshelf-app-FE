import { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

// Interfaces
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

interface borrowUI {
  id: number;
  title: string;
  username: string;
  bookDbUI: bookDbUI;
}

interface returnUI {
  id: number;
  title: string;
  bookDbUI: bookDbUI;
}

// APIs
const fetchAllApi = (bookURL: string) => (props: bookDbUI) => {
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

export const borrowBookApi = (bookURL: string) => (props: borrowUI) => {
  axios
    .post(bookURL + `status/id/${props.id}/${props.username}`)
    .then(response => {
      fetchAllApi(bookURL)({setBooks: props.bookDbUI.setBooks, setLoading: props.bookDbUI.setLoading})
    })
    .catch(err => {console.error(`There was an error borrowing the book ${props.title}: ${err}`)})
}

export const returnBookApi = (bookURL: string) => (props: returnUI) => {
  axios
    .post(bookURL+`status/id/${props.id}`)
    .then(response => {
      fetchAllApi(bookURL)({setBooks: props.bookDbUI.setBooks, setLoading: props.bookDbUI.setLoading})
    })
    .catch(err => {console.error(`There was an error returning the book ${props.title}: ${err}`)})
}