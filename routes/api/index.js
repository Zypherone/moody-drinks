const router = require('express').Router()
const random = require('./random')
const recipes = require('./recipes')
const drinks = require('./drinks')

// Book routes
router.use('/random', random)
router.use('/recipes', recipes)
router.use('/drinks', drinks)

module.exports = router
