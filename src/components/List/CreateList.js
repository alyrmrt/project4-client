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
      editBookData: {
        id: '',
        title: '',
        author: ''
      },
      createdId: null,
      newBookModal: false,
      editBookModal: false
    }

    componentWillMount () {
      this._refreshBooks()
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

    toggleEditBookModal () {
      this.setState({
        editBookModal: !this.state.editBookModal
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
        .then((res) => {
          this._refreshBooks()
        })
    }

    updateBook = (id) => {
      axios({
        url: 'http://localhost:4741/books/' + this.state.editBookData.id,
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        data: {
          book: this.state.editBookData
        }
      })
        .then((res) => {
          this._refreshBooks()

          this.setState({
            editBookModal: false, editBookData: { id: '', title: '', author: '' }
          })
        })
    }

    editBook (id, title, author) {
      this.setState({
        editBookData: { id, title, author }, editBookModal: !this.state.editBookModal
      })
    }

    deleteBook (id) {
      axios({
        url: 'http://localhost:4741/books/' + id,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        }
      })
        .then((res) => {
          this._refreshBooks()
        })
    }

    _refreshBooks () {
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

    render () {
      const books = this.state.books.map((book) => {
        return (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>
              <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.id, book.title, book.author)}>Edit</Button>
              <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.id)}>Delete</Button>
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
              <FormGroup>
                <Label for="url">Url</Label>
                <Input id="url" value={this.state.newBookData.url} onChange={(event) => {
                  const { newBookData } = this.state
                  newBookData.url = event.target.value
                  this.setState({ newBookData })
                }} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addBook.bind(this)}>Add A New Book</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
            <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a book</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input id="title" value={this.state.editBookData.title} onChange={(event) => {
                  const { editBookData } = this.state
                  editBookData.title = event.target.value
                  this.setState({ editBookData })
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="author">Author</Label>
                <Input id="author" value={this.state.editBookData.author} onChange={(event) => {
                  const { editBookData } = this.state
                  editBookData.author = event.target.value
                  this.setState({ editBookData })
                }} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
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
