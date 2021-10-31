import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { fetchBook, borrowBook, returnBook } from './../api/index'
import './style.css'

interface bookUI {
  id: number;
  author: string;
  title: string;
  rating: string;
  status: string;
  genre: string;
  desc: string;
}

interface detailUI {
  auth: string;
  username: string;
}

export const BookDetail = (props: detailUI) => {
  const [book, setBook] = useState<bookUI[]>([])
  const [loading, setLoading] = useState(true)
  const bookDbUI = {
    setBooks: setBook,
    setLoading: setLoading
  }

  const [isModify, setIsModify] = useState<boolean>(false)

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState('')
  const [genre, setGenre] = useState('')
  const [desc, setDesc] = useState('')

  const id = window.location.pathname[window.location.pathname.length-1]

  useEffect(() => {
    console.log(id)
    fetchBook({id: id, setBook: setBook, setLoading: setLoading})
  }, [id, setBook])

  if (loading)
    return <div>Loading...</div>

  const textInputToggle = () => {
    return isModify
    ? <div className="detail-display">
        <ul className="detail">
          <div className="form-field">
          <li className="detailItem">
            <label className="form-label" htmlFor="title">
              <em>Title</em>:
            </label>
            <input className="form-detail" type="text" id="title" name="title" value={book[0].title} 
            onChange={(e) => setTitle(e.currentTarget.value)} />
          </li>
          </div>
          <div className="form-field">
          <li className="detailItem"> 
            <label className="form-label" htmlFor="author">
              <em>Author</em>:
            </label>
            <input className="form-detail" type="text" id="author" name="author" value={book[0].author} 
            onChange={(e) => setAuthor(e.currentTarget.value)} />
          </li>
          </div>
          <div className="form-field">
          <li className="detailItem"> 
            <label className="form-label" htmlFor="genre">
              <em>Genre</em>:
            </label>
            <input className="form-detail" type="text" id="genre" name="genre" value={book[0].genre} 
            onChange={(e) => setGenre(e.currentTarget.value)} />
          </li>
          </div>
          <div className="form-field">
          <li className="detailItem"> 
            <label className="form-label" htmlFor="rating">
              <em>rating</em>:
            </label>
            <input className="form-detail" type="text" id="rating" name="rating" value={book[0].rating} 
            onChange={(e) => setRating(e.currentTarget.value)} />
          </li>
          </div>
        </ul>

        <div className="form-field">
          <label className="form-label" htmlFor="desc">
            <em>Descriptions</em>:
          </label>
          <textarea className="form-detail" id="desc" name="desc" rows={4} cols={50} 
          onChange={(e) => setDesc(e.currentTarget.value)} defaultValue={book[0].desc} />
        </div>
      </div>
    : <div className="detail-display">
        <ul className="detail">
          <li className="detailItem"><em>Title</em>: {book[0].title}</li>
          <li className="detailItem"><em>Author</em>: {book[0].author}</li>
          <li className="detailItem"><em>Genre</em>: {book[0].genre}</li>
          <li className="detailItem"><em>Rating</em>: {book[0].rating}</li>
        </ul>

        <div className="desc">
          <em>Descriptions</em>:
          <div className="desc-block">
          {book[0].desc}
          </div>
        </div>
      </div>
  }

  const handleAdminButtons = () => (
    isModify
    ? <div className="navBlock">
        <ul className="nav-ul">
          <li className="nav-left"><h2>Book Detail</h2></li>
          <li className="nav-right"><button className="status-btn" onClick={() => setIsModify(!isModify)}>
            Cancel
          </button></li>
          <li className="nav-right"><button className="status-btn">
            Save
          </button></li>
        </ul>
      </div>
    : <div className="navBlock">
        <ul className="nav-ul">
          <li className="nav-left"><h2>Book Detail</h2></li>
          <li className="nav-right"><button className="status-btn" onClick={() => setIsModify(!isModify)}>
            Modify
          </button></li>
        </ul>
      </div>
  )

  const handleStatusChange = () => {
    if (book[0].status === props.username)
      returnBook({id: id, title: title, bookDbUI: bookDbUI})
    else
      borrowBook({id: id, title: title, username: props.username, bookDbUI: bookDbUI})
  }

  const handleUserButtons = () => {
    if (book[0].status === "On Shelf" || book[0].status === props.username)
      return (
        <div className="navBlock">
          <ul className="nav-ul">
            <li className="nav-left"><h2>Book Detail</h2></li>
            <li className="nav-right"><button className="status-btn" onClick={handleStatusChange}>
              {book[0].status === "On Shelf" ? "Borrow" : "Return"}
            </button></li>
          </ul>
        </div>
      )
    else
      return (
        <div className="navBlock">
          <ul className="nav-ul">
            <li className="nav-left"><h2>Book Detail</h2></li>
          </ul>
        </div>
      )
  }

  const HeaderBlock = () => {
    if (props.auth === "admin")
      // Admin page
      return handleAdminButtons()
    else if (props.auth === "user")
      // User page
      return handleUserButtons()
    else
      // Public page
      return (
        <div className="navBlock">
          <ul className="nav-ul">
            <li className="nav-left"><h2>Book Detail</h2></li>
          </ul>
        </div>
      )
  }

  return(
    book.length > 0
  	? <div className="page-view">
      <HeaderBlock />

      {textInputToggle()}
  	</div>
    : <div>Book not exist</div>
  )
}