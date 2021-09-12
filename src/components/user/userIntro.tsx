import React, { useEffect,useState } from 'react'
import axios from 'axios'

// Import components
import { BookshelfList } from './../bookshelf/bookshelf-list'
import { FilterList } from './filterList'

import './style.css'

interface userUI {
  username: string;
}

interface BookUI {
  id: number;
  author: string;
  title: string;
  rating: string;
  status: string;
  genre: string;
  desc: string;
}

export const UserIntro = (props: userUI) => {

  const [books, setBooks] = useState<BookUI[]>([])
  const [loading, setLoading] = useState(true)

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

  const handleBookBorrow = (id: number, title: string, status: string) => {
    if (status === "On Shelf") {
      axios
        .post('http://localhost:5000/books/borrow', {id: id, username: props.username})
        .then(response => {
          console.log(response.data)

          fetchAllBooks()
        })
        .catch(err => {console.error(`There was an error borrowing the book ${title}: ${err}`)})
    }
    else if (status === props.username) {
      axios
        .post('http://localhost:5000/books/return', {id: id})
        .then(response => {
          console.log(response.data)

          fetchAllBooks()
        })
        .catch(err => {console.error(`There was an error borrowing the book ${title}: ${err}`)})
    }
    else {
      console.log('Someone else has borrowed the book')
    }
  }
  
  return (
    <div className="row">
      < FilterList setBooks={setBooks} username={props.username} />

      <div className="col-content">
        < BookshelfList books={books} loading={loading} handleBookChange={handleBookBorrow} username={props.username} />
      </div>
    </div>
  )
}