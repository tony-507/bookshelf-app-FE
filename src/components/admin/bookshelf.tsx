// Import deps
import React, { useEffect, useState } from 'react'
import {FormattedMessage} from 'react-intl'
import axios from 'axios'

// Import components
import { BookshelfList } from './../bookshelf/bookshelf-list'

// Import styles
import './style.css'

// Create Bookshelf component
const Bookshelf = () => {
  // Prepare states
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState('')
  const [genre, setGenre] = useState('')
  const [status, setStatus] = useState('On Shelf')
  const [desc, setDesc] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all books on initial render
  useEffect(() => {
    fetchAllBooks()
  },[])

  // Fetch all books
  const fetchAllBooks = async () => {
    // Send GET request to 'books/all' endpoint
    axios
      .get('http://localhost:5000/books/all')
      .then(response => {
        // Update the books state
        setBooks(response.data)

        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the book list: ${error}`))
  }

  // Reset all input fields
  const handleInputsReset = () => {
    setAuthor('')
    setTitle('')
    setRating('')
    setDesc('')
    setGenre('')
    setStatus('On Shelf')
  }

  // Create new book
  const handleBookCreate = () => {
    // Send POST request to 'books/create' endpoint
    axios
      .post('http://localhost:5000/books/create', {
        author: author,
        title: title,
        rating: rating,
        genre: genre,
        status: status,
        desc: desc
      })
      .then(res => {
        console.log(res.data)

        // Fetch all books to refresh
        // the books on the bookshelf list
        fetchAllBooks()
      })
      .catch(error => console.error(`There was an error creating the ${title} book: ${error}`))
  }

  // Submit new book
  const handleBookSubmit = () => {
    // Check if all fields are filled
    if (author.length > 0 && title.length > 0 && rating.length > 0) {
      // Create new book
      handleBookCreate()

      console.info(`Book ${title} by ${author} added.`)

      // Reset all input fields
      handleInputsReset()
    }
  }

  // Remove book
  const handleBookRemove = (id: number, title: string, status: string) => {
    // Send PUT request to 'books/delete' endpoint
    axios
      .put('http://localhost:5000/books/delete', { id: id })
      .then(() => {
        console.log(`Book ${title} removed.`)

        // Fetch all books to refresh
        // the books on the bookshelf list
        fetchAllBooks()
      })
      .catch(error => console.error(`There was an error removing the ${title} book: ${error}`))
  }

  // Reset book list (remove all books)
  const handleListReset = () => {
    // Send PUT request to 'books/reset' endpoint
    axios.put('http://localhost:5000/books/reset')
    .then(() => {
      // Fetch all books to refresh
      // the books on the bookshelf list
      fetchAllBooks()
    })
    .catch(error => console.error(`There was an error resetting the book list: ${error}`))
  }

  return (
    <div className="book-list-wrapper">
      {/* Form for creating new book */}
      <div className="book-list-form">
        <div className="form-wrapper" onSubmit={handleBookSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="title">
                <FormattedMessage id="enterXXX" defaultMessage="Enter " /><FormattedMessage id="title" defaultMessage="TITLE" />:
              </label>
              <input className="form-input" type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="author">
                <FormattedMessage id="enterXXX" defaultMessage="Enter " /><FormattedMessage id="author" defaultMessage="AUTHOR" />:
              </label>
              <input className="form-input" type="text" id="author" name="author" value={author} onChange={(e) => setAuthor(e.currentTarget.value)} />
            </fieldset>
          </div>

          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="rating">
                <FormattedMessage id="enterXXX" defaultMessage="Enter " /><FormattedMessage id="rating" defaultMessage="RATING" />:
              </label>
              <input className="form-input" type="text" id="rating" name="rating" value={rating} onChange={(e) => setRating(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="genre">
                <FormattedMessage id="enterXXX" defaultMessage="Enter " /><FormattedMessage id="genre" defaultMessage="GENRE" />:
              </label>
              <input className="form-input" type="text" id="genre" name="genre" value={genre} onChange={(e) => setGenre(e.currentTarget.value)} />
            </fieldset>
          </div>

          <div>
            <label className="form-label" htmlFor="desc">
              <FormattedMessage id="enterXXX" defaultMessage="Enter " /><FormattedMessage id="description" defaultMessage="DESCRIPTION" />:
            </label>
            <input className="form-input" type="text" id="desc" name="desc" value={desc} onChange={(e) => setDesc(e.currentTarget.value)} />
          </div>          
        </div>

        <button onClick={handleBookSubmit} className="btn btn-add">
          <FormattedMessage id="addBook" defaultMessage="Add the book" />
        </button>
      </div>

      {/* Render bookshelf list component */}
      <BookshelfList books={books} loading={loading} handleBookChange={handleBookRemove} username={''} />

      {/* Show reset button if list contains at least one book */}
      {books.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>
          <FormattedMessage id="resetList" defaultMessage="Reset books list" />
        </button>
      )}
    </div>
  )
}

export default Bookshelf