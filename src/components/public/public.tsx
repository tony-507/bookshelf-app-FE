import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import { BookshelfList } from './../bookshelf/bookshelf-list'
import { fetchAllBooks } from './../api/index'
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

interface authUI {
  auth: String;
}

export const PublicPage = (props: authUI) => {
  const [books, setBooks] = useState<BookUI[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  let history = useHistory()

  useEffect(() => fetchAllBooks({setBooks: setBooks, setLoading: setLoading}),[])

  const handleBookChange = (id: number, title: string, status: string) => {}

  if (props.auth === "admin")
    history.push("/admin")
  else if (props.auth === "user")
    history.push("/user")
  else
    return(
      <div className="page-view">
        <BookshelfList books={books} loading={loading} handleBookChange={handleBookChange} username={''} isPublic={true} />
      </div>
    )

}