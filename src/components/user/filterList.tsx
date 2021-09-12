import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import axios from 'axios'
import { FilterRow } from './filterRow'

interface BookUI {
  id: number;
  author: string;
  title: string;
  rating: string;
  status: string;
  genre: string;
  desc: string;
}

interface filterUI {
	setBooks: Dispatch<SetStateAction<BookUI[]>>;
	username: string;
}

export const FilterList = (props: filterUI) => {
  const [ratingList, setRatingList] = useState([])
  const [genreList, setGenreList] = useState([])
  const statusList = ['On Shelf', 'Borrowed', 'Not On Shelf']
  const statusMapList = ['On Shelf', props.username, 'Not On Shelf','dummy']

  const TopFive = (type: string) => {
  	axios
  	  .get('http://localhost:5000/books/top5',{
  	  	params: {type: type}
  	  })
  	  .then(response => {
  	  	const responseArray = response.data.reduce((cur: string[],next: Record<string,string>) => [...cur,next[type]],[])
		if (type === 'genre')
		  setGenreList(responseArray)
		else
		  setRatingList(responseArray)
  	  })
  	  .catch(err => console.error(`Error in retrieveing ${type}: ${err}`))
  }

  useEffect(() => {
  	TopFive('rating')
  	TopFive('genre')
  },[])

  const handleStatusArray = () => {
  	let statusArr: number[] = []
  	let dummy
  	for (let i=0; i<2; i++) {
  	  dummy = document.getElementById('Status'+i) as HTMLInputElement
  	  if (dummy)
  	  	if ((document.getElementById('Status'+i) as HTMLInputElement).checked)
  	  		statusArr.push(i)
  	}

  	dummy = document.getElementById('Status2') as HTMLInputElement
  	if (dummy)
  		if ((document.getElementById('Status2') as HTMLInputElement).checked) {
  			if (statusArr.length === 0)
  			  statusArr = [0,1]
  			else if (statusArr.length === 2)
  				statusArr = []
  			else
  			  statusArr = statusArr.map((item) => 1-item)
  			statusArr.push(1)
  			return statusArr
  		}
  		else {
  			statusArr.push(0)
  			return statusArr
  		}
  }

  const handleFilterClick = () => {
  	let ratingArr: number[] = []
  	let genreArr: number[] = []
  	let statusArr: number[] = []
  	let dummy
  	let notOnShelf: boolean = false

  	for (let i=0; i<genreList.length; i++) {
  	  dummy = document.getElementById('Genre'+i) as HTMLInputElement
  	  if ((dummy && dummy.checked) || dummy === null)
  	  	genreArr.push(i)
  	}
	const selectedGenre = genreArr.reduce((acc,cur) => [...acc,genreList[cur]], [])

  	for (let i=0; i<ratingList.length; i++) {
  	  dummy = document.getElementById('Rating'+i) as HTMLInputElement
  	  if ((dummy && dummy.checked) || dummy === null)
  	  	ratingArr.push(i)
  	}
  	const selectedRating = ratingArr.reduce((acc,cur) => [...acc,ratingList[cur]], [])

  	for (let i=0; i<2; i++) {
  	  dummy = document.getElementById('Status'+i) as HTMLInputElement
  	  if (dummy && dummy.checked)
  	  		statusArr.push(i)
  	  else if (dummy === null) {
  	  	statusArr = [1,2,3]
  	  	notOnShelf = true
  	  	break
  	  }
  	}
  	dummy = document.getElementById('Status2') as HTMLInputElement
  	if (dummy) {
  	  notOnShelf = (document.getElementById('Status2') as HTMLInputElement).checked
  	  if (notOnShelf===true) {
  	    if (statusArr.length === 0)
  	      statusArr = [0,1]
  	    else if (statusArr.length === 1)
  	      statusArr = statusArr.map((x) => 1-x)
  	    else
  	      statusArr = [1,2,3]
  	  }
  	}
  	const selectedStatus = statusArr && statusArr.reduce((acc: string[],cur: number) => [...acc,statusMapList[cur]], [])

  	axios
  	  .get('http://localhost:5000/books/filter', {
  	  	params: {
  	  		selectedRating: selectedRating,
  	  		selectedStatus: selectedStatus,
  	  		selectedGenre: selectedGenre,
  	  		username: props.username,
  	  		notOnShelf: notOnShelf
  	  	}
  	  })
  	  .then(response => {
  	  	props.setBooks(response.data)
  	  })
  	  .catch(err => console.error(`Error in filtering books: ${err}`))
  }

  return(
  	<div className='col-menu'>
  	  <h3>Quick Filters</h3>
      <FilterRow list={ratingList} item={'Rating'} />
      <FilterRow list={statusList} item={'Status'} />
      <FilterRow list={genreList} item={'Genre'} />
      <button className="filter-btn" onClick={handleFilterClick}>Apply Filters</button>
    </div>
  )
}