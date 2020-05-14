import React, { Fragment } from 'react'
import Books from './Books'

const Search = () => {
  return (
    <Fragment>
      <header className="border-box">
        <h1>Book Search</h1>
      </header>
      <Books />
    </Fragment>
  )
}

export default Search
