// Import deps
import React from 'react'
import { useHistory } from 'react-router-dom'
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
  isPublic: boolean;
}

// Create BookshelfListRow component
export const BookshelfListRow = (props: BookshelfListRowUI) => {

  let history = useHistory()

  const handleShowStatus = () => {
    if (props.username === props.book.status)
      return <FormattedMessage id="Borrowed" defaultMessage="status_borrowed" />
    else if (props.book.status === 'On Shelf')
      return <FormattedMessage id="On Shelf" defaultMessage="status_on_shelf" />
    else {
      return(
        props.username === '' && !props.isPublic
        ? <FormattedMessage id="Borrowed by" defaultMessage="status_borrowed_admin" values={{user: `${props.book.status}`}}/>
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

  const redirectBookDetail = () => {history.push(`/books/${props.book.id}`)}

  return(
    <tr className="table-row">
      <td className="table-item">
        {props.position}
      </td>

      <td className="table-item">
        <button className="detail-btn" onClick={redirectBookDetail}><u>{props.book.title}</u></button>
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

      {props.isPublic
      ? (<td className="table-item">
      </td>)
      : (<td className="table-item">
        <button
          className="btn btn-remove"
          onClick={() => props.handleBookChange(props.book.id, props.book.title,props.book.status)}>
          {handleChangeButton()}
        </button>
      </td>)}
    </tr>)
}