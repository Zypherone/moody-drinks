import React from "react";
import API from "utils/API";
import { Row, Col } from 'react-bootstrap'
import SavedBooks from "components/SavedBooks";

class SaveBooks extends React.Component {
  state = {
    results: []
  };

  getBooks = () => {
    API.getBooks()
      .then((data) => {
        console.log(data)
        return this.setState({ results: data.data });
      })
      .catch(err => console.log(err));
  };

  getBook = (id) => {
    console.log(id)
    API.getBook(id)
      .then((data) => {
        console.log(data)
        return this.setState({ results: [ data.data ] });
      })
      .catch(err => console.log(err));
  };

  deleteBook = (id) => {
    return API.deleteBook(id)
      .then(() => { this.getBooks() })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const { match: { params } } = this.props;
    
    if (params.id) 
      this.getBook(params.id);
    else
      this.getBooks();

  };

  render() {
    const { results } = this.state;
    return (
      <>
        <Row>
          <Col>
            <SavedBooks saved={results} deleteBook={this.deleteBook} />
          </Col>
        </Row>
      </>
    );
  };
};

export default SaveBooks;