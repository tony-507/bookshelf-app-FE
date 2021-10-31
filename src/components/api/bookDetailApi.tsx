import { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

interface bookUI {
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
  setBook: Dispatch<SetStateAction<bookUI[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
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