import React, { Component } from "react";
import API from "../utils/API";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row' 
import Jumbotron from 'react-bootstrap/Jumbotron' 

import SearchBar from "components/SearchBar";
import Results from "components/Results";

class SearchBooks extends Component {
  state = {
    search: "",
    results: [],
    error: ""
  };

  searchBooks = (event) => {
    event.preventDefault();
    let searchTerm = document.getElementById("searchbar").value;
    API.getGoogleBookSearch(searchTerm)
    .then((res) => {
      let results = res.data.items;
      results = results.map((result) => {
        const d = result.volumeInfo;
        let book = {
          id: result.id,
          title: d.title,
          authors: d.authors,
          image: d.imageLinks.thumbnail,
          description: d.description,
          link: result.volumeInfo.infoLink
        };
        console.log(book) // Testing errors
        return book;
      });
      console.log(results)// Testing errors
      this.setState({ results: results });
    })
    .catch(err => console.log(err));
  };

  saveBook = (id) => {
    console.log(id)
    console.log(this.state.results)// Testing errors
    let bookSaveChoice = this.state.results.filter((book) => (book.id === id));
    console.log(bookSaveChoice) // Testing errors
    return API.saveBook(bookSaveChoice[0])
      .then(console.log(bookSaveChoice[0]))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Row>
        <SearchBar searchBooks={this.searchBooks} />
        <Results results={this.state.results} saveBook={this.saveBook} />
      </Row>
    );
  }
}

export default SearchBooks;