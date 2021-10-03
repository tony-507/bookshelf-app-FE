import React, { useState, useEffect } from 'react'

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

export const PublicPage = () => {
  const [books, setBooks] = useState<BookUI[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => fetchAllBooks({setBooks: setBooks, setLoading: setLoading}),[])

  const handleBookChange = (id: number, title: string, status: string) => {}

  return(
  	<div className="page-view">
  	  <BookshelfList books={books} loading={loading} handleBookChange={handleBookChange} username={''} isPublic={true} />
  	</div>
  )

}