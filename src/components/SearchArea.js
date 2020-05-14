import React from 'react'

const SearchArea = (props) => {
  return (
    <div className="search-area">
      <form onSubmit={props.searchBook}>
        <input placeholder="Search Books..." onChange={props.handleSearch} type="text"/>
        <button id="sub" type="submit">Search</button>
      </form>

    </div>
  )
}

export default SearchArea
