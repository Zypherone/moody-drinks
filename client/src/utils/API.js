import axios from 'axios'
const G_SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes?q='
// const SEARCH_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

export default {
  getRandom: (query) => {
    query = 'random.php'
    // return axios.get(SEARCH_URL + query);
    return axios.get('/api/random')
  },
  getById: (query) => {
    return axios.get('/api/recipes/' + query)
  },
  getByType: (query) => {
    return axios.get('/api/drinks/' + query)
  },
  getGoogleBookSearch: (query) => {
    return axios.get(G_SEARCH_URL + query)
  },
  saveBook: (bookSaveChoice) => {
    return axios.post('/api/books', bookSaveChoice)
  },
  getBooks: () => {
    return axios.get('/api/books')
  },
  getBook: (id) => {
    return axios.get('/api/books/' + id)
  },
  deleteBook: (id) => {
    return axios.delete('/api/books/' + id)
  }
}
