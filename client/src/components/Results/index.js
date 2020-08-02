import React, { useState, useEffect, useContext } from 'react'
import {
  useParams
} from 'react-router-dom'
import { AuthContext } from 'components/_Auth'

import app from 'components/_Firebase'
import API from 'utils/API'

import RecipeCard from 'components/RecipeDetails'

// import Book from 'components/Book'

/*
async function getRecipe (authToken, studentId) {
  try {
    let data = await Promise.all([
      getJobApplications(studentId),
      getAccountSettings(accountSettings),
      getProfileDetails(studentId)
    ]);

    // Implicitly wraps this return value in a promise
    return {
      apps: data[0],
      account: data[1],
      profile: data[2]
    }
  }

  catch (err) {
    // handle error
  }
}
*/

const Results = (props) => {
  const { pagename, recipeId } = useParams()
  const [results, setResults] = useState([])
  const [loader, setLoader] = useState(true)
  const { currentUser: user } = useContext(AuthContext)

  const getResults = () => {
    switch (pagename) {
      case 'after-work':
        API.getByType('vodka')
          .then((results) => {
            setResults(results.data.results)
          })
        break
      case 'blue':
        API.getByType('gin')
          .then((results) => {
            setResults(results.data.results)
          })
        break
      case 'party':
        API.getByType('tequila')
          .then((results) => {
            setResults(results.data.results)
          })
        break
      case 'easy':
        API.getByType('rum')
          .then((results) => {
            setResults(results.data.results)
          })
        break
      case 'safe':
        API.getByType('mocktails')
          .then((results) => {
            setResults(results.data.results)
          })
        break
      case 'surprise':
        API.getRandom()
          .then((results) => {
            setResults(results.data.results)
          })
        break
      case 'favs':

        const db = app.database().ref().child('v/2/favs/' + user.uid)
        db.once('value').then(function (snapshot) {
          const res = snapshot.val() ? snapshot.val() : []
          console.log(Object.values(res).length)
          if (Object.values(res).length) {
            const results = Object.values(res).map((recipe) => {
              return recipe
            })
            setResults(results)
          }

          setTimeout(() => {
            setLoader(false)
          }, 5000)
        })

        break
    }
  }

  useEffect(() => {
    getResults()
  }, [])

  return (
    <>
      {(results.length !== 0) ? (
        results.map((recipe) => {
          return (
            <RecipeCard key={recipe.id.toString()} recipe={recipe} />
          )
        })
      ) : (
        loader ? (
          <div className='lds-ring'><div /><div /><div /><div /></div>
        ) : (
          <>
            No results
          </>
        )
      )}
    </>
  )
}

export default Results
