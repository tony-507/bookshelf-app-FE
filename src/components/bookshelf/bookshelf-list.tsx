// bookshelf-app/src/components/bookshelf-list.tsx

// Import deps
import React from 'react'
import {FormattedMessage} from 'react-intl'

// Import components
import { BookshelfListRow } from './bookshelf-list-row'

// Import styles
import './style.css'

// Create interfaces
interface BookUI {
  id: number;
  author: string;
  title: string;
  rating: string;
  status: string;
  genre: string;
  desc: string;
}

interface BookshelfListUI {
  books: BookUI[];
  loading: boolean;
  handleBookChange: (id: number, title: string, status: string) => void;
  username: string;
  isPublic: boolean;
}

// Create BookshelfList component
export const BookshelfList = (props: BookshelfListUI) => {
  // Show loading message
  if (props.loading) return <p>Loading...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item"><FormattedMessage id="title" defaultMessage="TITLE" /></th>

            <th className="table-head-item"><FormattedMessage id="author" defaultMessage="AUTHOR" /></th>

            <th className="table-head-item"><FormattedMessage id="rating" defaultMessage="RATING" /></th>

            <th className="table-head-item"><FormattedMessage id="genre" defaultMessage="GENRE" /></th>

            <th className="table-head-item"><FormattedMessage id="status" defaultMessage="STATUS" /></th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.books.length > 0 ? (
            props.books.map((book: BookUI, idx) => (
              <BookshelfListRow
                key={book.id}
                book={book}
                position={idx + 1}
                handleBookChange={props.handleBookChange}
                username={props.username}
                isPublic={props.isPublic}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>No books found.</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}