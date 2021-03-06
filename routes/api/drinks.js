const router = require('express').Router()
const dirnksController = require('../../controllers/drinks')

// // Matches with "/api/books"
// router.route("/")
//   .get(booksController.findAll)
//   .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route('/:type')
  .get(dirnksController.findByType)

module.exports = router
