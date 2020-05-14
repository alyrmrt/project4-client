import React from 'react'

const BookCard = (props) => {
  return (
    <div className="card-container">
      <img src={props.image} />
      <div className="desc">
        <p>{props.title}</p>
        <p>{props.author} </p>
        <p>{props.publishedDate}</p>
      </div>
    </div>
  )
}

export default BookCard
