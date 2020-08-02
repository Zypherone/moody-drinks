import React from 'react'
import Book from 'components/Book'
import { Row, Col } from 'react-bootstrap'

function SavedBooks (props) {
  const { saved, deleteBook } = props

  return (saved.length === 0) ? (
    <Row id='SavedBooks' as='Main'>
      <Col>
        <h2>You have no books saved at the moment...</h2>
      </Col>
    </Row>
  ) : (
    <Row id='SavedBooks' as='Main'>
      <Col>
        <h2>You have {saved.length} saved book(s).</h2>
        {saved.map((book) => {
          return (
            <Book
              key={book._id}
              id={book._id}
              image={book.image}
              title={book.title}
              author={book.authors}
              description={book.description}
              link={book.link}
              deleteBook={deleteBook}
            />
          )
        })}
      </Col>
    </Row>
  )
};

export default SavedBooks
