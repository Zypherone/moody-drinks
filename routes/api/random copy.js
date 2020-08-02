const router = require('express').Router()
const dirnksController = require('../../controllers/dirnksController')

// // Matches with "/api/books"
// router.route("/")
//   .get(booksController.findAll)
//   .post(booksController.create);

// Matches with "/api/books/:id"
router
  // .route("/:id")
  .route('/')
  .get(dirnksController.findRandom)
  // .put(booksController.update)
  // .delete(booksController.remove);

module.exports = router
