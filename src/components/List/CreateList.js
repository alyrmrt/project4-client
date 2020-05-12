import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap'
import axios from 'axios'

class CreateList extends Component {
    state = {
      books: [],
      newBookData: {
        title: '',
        author: ''
      },
      createdId: null,
      newBookModal: false
    }

    componentDidMount () {
      axios({
        url: 'http://localhost:4741/books',
        method: 'get',
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        }
      })
        .then(res => {
          console.log(res)
          this.setState({ books: res.data.books })
        })
    }

    toggleNewBookModal () {
      this.setState({
        newBookModal: !this.state.newBookModal
      })
    }

    addBook = (event) => {
      axios({
        url: 'http://localhost:4741/books',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        data: {
          book: this.state.newBookData
        }
      })
        .then((res) => {
          const { books } = this.state
          books.push(res.data)
          this.setState({ books,
            newBookModal: false,
            newBookData: {
              title: '',
              author: ''
            } })
        })
    }

    render () {
      const books = this.state.books.map((book) => {
        return (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>
              <Button color="success" size="sm" className="mr-2">Edit</Button>
              <Button color="danger" size="sm">Delete</Button>
            </td>
          </tr>
        )
      })
      return (
        <div className="App Container">

          <h1>Books App</h1>

          <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>
          <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
            <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Modal title</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input id="title" value={this.state.newBookData.title} onChange={(event) => {
                  const { newBookData } = this.state
                  newBookData.title = event.target.value
                  this.setState({ newBookData })
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="author">Author</Label>
                <Input id="author" value={this.state.newBookData.author} onChange={(event) => {
                  const { newBookData } = this.state
                  newBookData.author = event.target.value
                  this.setState({ newBookData })
                }} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addBook.bind(this)}>Add A New Book</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books}
            </tbody>
          </Table>
        </div>
      )
    }
}

export default withRouter(CreateList)
