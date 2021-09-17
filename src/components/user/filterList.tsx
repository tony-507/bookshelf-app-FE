import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'

import { FilterRow } from './filterRow'
import { getTopFive, applyFilter } from './../api/index'

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
  const [ratingList, setRatingList] = useState<string[]>([])
  const [genreList, setGenreList] = useState<string[]>([])
  const statusList = ['On Shelf', 'Borrowed', 'Not On Shelf']
  const statusMapList = ['On Shelf', props.username, 'Not On Shelf','dummy']

  const TopFive = (type: string) => {
    if (type === 'genre')
      getTopFive({type: type, setList: setGenreList})
    else
      getTopFive({type: type, setList: setRatingList})
  }

  useEffect(() => {
  	TopFive('rating')
  	TopFive('genre')
  },[])

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
	const selectedGenre: string[] = genreArr.reduce((acc: string[],cur: number) => [...acc,genreList[cur]], [])

  	for (let i=0; i<ratingList.length; i++) {
  	  dummy = document.getElementById('Rating'+i) as HTMLInputElement
  	  if ((dummy && dummy.checked) || dummy === null)
  	  	ratingArr.push(i)
  	}
  	const selectedRating: string[] = ratingArr.reduce((acc: string[],cur: number) => [...acc,ratingList[cur]], [])

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
  	const selectedStatus: string[] = statusArr && statusArr.reduce((acc: string[],cur: number) => [...acc,statusMapList[cur]], [])

    applyFilter({
      selectedRating: selectedRating,
      selectedStatus: selectedStatus,
      selectedGenre: selectedGenre,
      username: props.username,
      notOnShelf: notOnShelf,
      setBooks: props.setBooks
    })
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