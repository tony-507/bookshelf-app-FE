import React, { useEffect,useState, Dispatch, SetStateAction } from 'react'

// Import components
import { BookshelfList } from './../bookshelf/bookshelf-list'
import { FilterList } from './filterList'
import { fetchAllBooks, borrowBook, returnBook } from './../api/index'

import './style.css'

interface userUI {
  username: string;
  messageDisplay: {
    setError: Dispatch<SetStateAction<string>>;
    setDisplayError: Dispatch<SetStateAction<boolean>>;
    setOk: Dispatch<SetStateAction<string>>;
    setDisplayOk: Dispatch<SetStateAction<boolean>>;
  }
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
  const [loading, setLoading] = useState<boolean>(true)
  const bookDbUI = {
    setBooks: setBooks,
    setLoading: setLoading
  }

  useEffect(() => {
    fetchAllBooks({setBooks: setBooks, setLoading: setLoading})
  },[setLoading])

  const handleBookBorrow = (id: number, title: string, status: string) => {
    if (status === "On Shelf") {
      borrowBook({id: id, title: title, username: props.username, bookDbUI: bookDbUI})
    }
    else if (status === props.username) {
      returnBook({id: id, title: title, bookDbUI: bookDbUI})
    }
  }
  
  return (
    <div className="row page-view">
      < FilterList setBooks={setBooks} username={props.username} />

      <div className="col-content">
        < BookshelfList books={books} loading={loading} handleBookChange={handleBookBorrow} username={props.username} isPublic={false}/>
      </div>
    </div>
  )
}