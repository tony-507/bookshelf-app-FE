import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from "react-router-dom"
import {fetchBook} from './../api/index'
import './style.css'

interface BookUI {
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
}

export const BookDetail = (props: detailUI) => {
  const [book, setBook] = useState<BookUI[]>([])
  const [loading, setLoading] = useState<Boolean>(true)
  let { id } = useParams()

  useEffect(() => {
    fetchBook({id: id, setBook: setBook, setLoading: setLoading})
  }, [id])

  if (loading)
    return <div>Loading...</div>

  const HeaderBlock = () => {
    if (props.auth === "admin")
      // Admin page
      return (
        <div className="navBlock">
          <ul className="nav-ul">
            <li className="nav-left"><h2>Book Detail</h2></li>
            <li className="nav-right"><button className="status-btn">Modify</button></li>
            <li className="nav-right"><button className="status-btn">Remove</button></li>
          </ul>
        </div>
      )
    else if (props.auth === "user")
      // User page
      return (
        <div className="navBlock">
          <ul className="nav-ul">
            <li className="nav-left"><h2>Book Detail</h2></li>
            <li className="nav-right"><button className="status-btn">
              {book[0].status === "On Shelf" ? "Borrow" : "Return"}
            </button></li>
          </ul>
        </div>
      )
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
    : <Redirect to="/error/404" />
  )
}