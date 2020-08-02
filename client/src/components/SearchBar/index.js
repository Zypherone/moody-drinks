
import React from 'react'
import { Button, Form, FormControl, InputGroup, Container } from 'react-bootstrap'

function SearchBar (props) {
  return (
    <Container fluid>
      <Form>
        <InputGroup className='mb-3'>
          <FormControl
            id='searchbar'
            placeholder='Search book...'
            aria-label='Search book...'
            aria-describedby='basic-addon2'
          />
          <InputGroup.Append>
            <Button variant='outline-secondary' type='submit' onClick={(event) => props.searchBooks(event)}>Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </Container>
  )
};

export default SearchBar
