import React from 'react'

const BookCard = (props) => {
  return (
    <div className="card-container">
      <img src={props.image} />
      <div className="desc">
        <p>{props.title}</p>
        <p>{props.author} </p>
        <p>{props.published}</p>
        <p>{props.infoLink}</p>
        <button className="url primary" onClick={() => {
          window.open(props.infoLink)
        }}>Go to the Book</button>
      </div>
    </div>
  )
}

export default BookCard
