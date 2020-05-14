import React, { Component } from 'react'
import SearchArea from './SearchArea'
import request from 'superagent'
import BookList from './BookList'

class Books extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: [],
      searchField: ''
    }
  }

    searchBook = (event) => {
      event.preventDefault()
      request
        .get('https://www.googleapis.com/books/v1/volumes')
        .query({ q: this.state.searchField })
        .then((data) => {
          this.setState({ books: [...data.body.items] })
        })
    }

   handleSearch = (event) => {
     console.log(event.target.value)
     this.setState({ searchField: event.target.value })
   }

   render () {
     return (
       <div>
         <SearchArea searchBook={this.searchBook} handleSearch={this.handleSearch} />
         <BookList books={this.state.books} />
       </div>
     )
   }
}

export default Books
