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

interface bookRemoveUI {
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

export const createBookApi = (bookURL: string) => (props: bookCreateUI) => {
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
    fetchAllApi(bookURL)(props.bookDbUI)
  })
  .catch(error => console.error(`There was an error creating the ${props.bookInstance.title} book: ${error}`))
}

export const removeBookApi = (bookURL: string) => (props: bookRemoveUI) => {
  axios
	.put(bookURL + 'delete', { id: props.id })
	.then(() => {
	console.log(`Book ${props.title} removed.`)

	// Fetch all books to refresh
	// the books on the bookshelf list
	fetchAllApi(bookURL)(props.bookDbUI)
	})
	.catch(error => console.error(`There was an error removing the ${props.title} book: ${error}`))
}

export const resetBookApi = (bookURL: string) => (props: bookDbUI) => {
  axios.put(bookURL + 'reset')
    .then(() => {
      // Fetch all books to refresh
      // the books on the bookshelf list
      fetchAllApi(bookURL)(props)
    })
    .catch(error => console.error(`There was an error resetting the book list: ${error}`))
}