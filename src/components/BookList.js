import React from 'react'
import BookCard from './BookCard'

const BookList = (props) => {
  return (
    <div className="list">
      {
        props.books.map((book, index) => {
          return <BookCard
            key={index}
            image={book.volumeInfo.imageLinks.thumbnail}
            author={book.volumeInfo.authors}
            published={book.volumeInfo.publishedDate}
            infoLink={book.volumeInfo.infoLink}
          />
        })
      }
    </div>
  )
}

export default BookList
