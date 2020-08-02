
const axios = require('axios')
const db = require('../models')
const { json } = require('express')
const SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/'

// Defining methods for the googleController
// findAll searches the Google Books API and returns only the entries we haven't already saved
// It also makes sure that the books returned from the API all contain a title, author, link, description, and image

const cleanData = (detail) => {
  const { idDrink, strDrink, strDrinkThumb, strInstructions } = detail

  const ingredients = []

  for (let i = 1; i <= 15; i++) {
    let name = ''
    let measurement = ''

    // Check to see if the ingredient string is empty or not
    if (detail['strIngredient' + i]) {
      name = detail['strIngredient' + i]
    }

    // Check to see if the measurement string is empty or not
    if (detail['strMeasure' + i]) {
      measurement = detail['strMeasure' + i]
    }

    // Check if both ingredient and measurement are not empty strings
    if (name != '' || measurement != '') {
      // Push data is the handlebar object
      ingredients.push({
        name: name,
        measurement: measurement
      })
    }
  }

  return { id: idDrink, name: strDrink, thumb: strDrinkThumb, instructions: strInstructions, ingredients: ingredients }
}

module.exports = {
  findById: function (req, res) {
    const { query: params } = req
    const queryUrl = SEARCH_URL + 'lookup.php?i=' + req.params.id

    axios.get(queryUrl)
      .then(results =>
        results.data.drinks
          .map(cleanData)
      )
      .then(details => {
        res.json({ results: details })
      })
      .catch(err => res.status(422).json(err))
  },
  getRandom: function (req, res) {
    const { query: params } = req
    const queryUrl = SEARCH_URL + 'random.php'

    // console.log(params);
    axios
      .get(queryUrl, {
        params
      })
      .then(results =>
        results.data.drinks.filter(
          recipe =>
            recipe.idDrink &&
            recipe.strDrink &&
            recipe.strDrinkThumb
        )
      )
      .then(recipes =>
        recipes.map(({ idDrink, strDrink, strDrinkThumb }) => {
          return { id: idDrink, name: strDrink, thumb: strDrinkThumb }
        })
      )
      .then(recipes => {
        query = SEARCH_URL + 'lookup.php?i=' + recipes[0].id
        axios.get(query)
          .then(recipesResults =>
            recipesResults.data.drinks
              .map(cleanData)
          )
          .then(details => {
            res.json({ results: details })
          })
          .catch(err => res.status(422).json(err))
      })
      .catch(err => res.status(422).json(err))
  },
  findByType: function (req, res) {
    const { query: params } = req
    const { type } = req.params

    const queryUrl = SEARCH_URL +
        'filter.php?' +
        (type === 'mocktails' ? 'a' : 'i') +
        '=' +
        (type === 'mocktails' ? 'Non_Alcoholic' : type)

    axios
      .get(queryUrl, {
        params
      })
      .then(results =>
        results.data.drinks.filter(
          recipe =>
            recipe.idDrink &&
            recipe.strDrink &&
            recipe.strDrinkThumb
        )
      )
      .then(recipes =>
        recipes.map(({ idDrink, strDrink, strDrinkThumb }) => {
          return { id: idDrink, name: strDrink, thumb: strDrinkThumb }
        })
      )
      .then(recipes => {
        query = SEARCH_URL + 'lookup.php?i=' + recipes[0].id
        axios.get(query)
          .then(recipesResults =>
            recipesResults.data.drinks
              .map(cleanData)
          )
          .then(details => {
            res.json({ results: details })
          })
          .catch(err => res.status(422).json(err))
      })
      .catch(err => res.status(422).json(err))
  }
}
