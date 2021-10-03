import { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

interface BookUI {
  id: number;
  author: string;
  title: string;
  rating: string;
  status: string;
  genre: string;
  desc: string;
}

interface fetchBookUI {
  id: number;
  setBook: Dispatch<SetStateAction<BookUI[]>>;
  setLoading: Dispatch<SetStateAction<Boolean>>;
}

export const fetchBookApi = (bookURL: string) => (props: fetchBookUI) => {
  axios
    .get(bookURL + `id/${props.id}`)
    .then(response => {
      props.setBook(response.data)
      props.setLoading(false)
    })
    .catch(err => console.error())
}