// Import deps
import React from 'react';

// Create interfaces
interface BookshelfListRowUI {
  position: number;
  book: {
    id: number;
    author: string;
    title: string;
    rating: string;
    status: string;
    genre: string;
    desc: string
  };
  handleBookChange: (id: number, title: string, status: string) => void;
  username: string;
}

// Create BookshelfListRow component
export const BookshelfListRow = (props: BookshelfListRowUI) => {

  const handleShowStatus = () => {
    if (props.username === props.book.status)
      return 'Borrowed'
    else if (props.book.status === 'On Shelf')
      return 'On Shelf'
    else {
      return(
        props.username === ''
        ? `Borrowed By ${props.book.status}`
        : 'Not On Shelf'
      )
    }
  }

  const handleChangeButton = () => {
    if (props.username === '')
      return 'Remove book'
    else if (props.book.status === 'On Shelf')
      return 'Borrow book'
    else if (props.book.status === props.username)
      return 'Return book'
    else
      return null
  }

  return(
    <tr className="table-row">
      <td className="table-item">
        {props.position}
      </td>

      <td className="table-item">
        {props.book.title}
      </td>

      <td className="table-item">
        {props.book.author}
      </td>

      <td className="table-item">
        {props.book.rating}
      </td>

      <td className="table-item">
        {props.book.genre}
      </td>

      <td className="table-item">
        {handleShowStatus()}
      </td>

      <td className="table-item">
        <button
          className="btn btn-remove"
          onClick={() => props.handleBookChange(props.book.id, props.book.title,props.book.status)}>
          {handleChangeButton()}
        </button>
      </td>
    </tr>)
}