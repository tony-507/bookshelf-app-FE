import React, { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

// Interfaces
interface bookUI {
  id: number;
  author: string;
  title: string;
  rating: string;
  status: string;
  genre: string;
  desc: string;
}

interface bookDbUI {
  setBooks: Dispatch<SetStateAction<bookUI[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

interface filterUI {
  selectedRating: string[];
  selectedStatus: string[];
  selectedGenre: string[];
  username: string;
  notOnShelf: boolean;
  setBooks: Dispatch<SetStateAction<bookUI[]>>;
}

interface topFiveUI {
  type: string;
  setList: Dispatch<SetStateAction<string[]>>;
}

// APIs
export const fetchAllApi = (bookURL: string) => (props: bookDbUI) => {
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

export const filterApi = (bookURL: string) => (props: filterUI) => {
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

export const getTopFiveApi = (bookURL: string) => (props: topFiveUI) => {
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