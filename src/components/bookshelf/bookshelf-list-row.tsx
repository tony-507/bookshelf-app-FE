// Import deps
import React from 'react'
import {FormattedMessage} from 'react-intl'

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
      return <FormattedMessage id="Borrowed" defaultMessage="status_borrowed" />
    else if (props.book.status === 'On Shelf')
      return <FormattedMessage id="On Shelf" defaultMessage="status_on_shelf" />
    else {
      return(
        props.username === ''
        ? <FormattedMessage id="Borrowed by" defaultMessage="status_borrowed_admin" /> + `${props.book.status}`
        : <FormattedMessage id="Not On Shelf" defaultMessage="status_borrowed_user" />
      )
    }
  }

  const handleChangeButton = () => {
    if (props.username === '')
      return <FormattedMessage id="Remove book" defaultMessage="remove_book" />
    else if (props.book.status === 'On Shelf')
      return <FormattedMessage id="Borrow book" defaultMessage="borrow_book" />
    else if (props.book.status === props.username)
      return <FormattedMessage id="Return book" defaultMessage="return_book" />
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