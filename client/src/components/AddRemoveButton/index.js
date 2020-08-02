import React, { useEffect, useState, useContext } from 'react'
import _ from 'lodash'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import app from 'components/_Firebase'
import { AuthContext } from 'components/_Auth'
import API from 'utils/API'

function AddRemoveButton (props) {
  const [isLoading, setLoading] = useState(false)
  const [isSaved, setIsSaved] = useState('default')
  const { currentUser: user } = useContext(AuthContext)
  const { id: drinkId } = props

  useEffect(() => {

    const db = app.database().ref().child('v/2/favs/' + user.uid)
    let res = []

    db.once('value').then(function (snapshot) {
      res = snapshot.val() ? snapshot.val() : []
      if (Object.values(res).length) { return Object.values(res).map((recipe) => recipe) }
    })
      .then((results) =>
        _.findKey(results, { id: drinkId })
      )
      .then((results) => {
        if (results) {
          setIsSaved('secondary')
        }
      })
  }, [isSaved])

  useEffect(() => {

    if (isLoading) {
      let recipe = {}
      API.getById(drinkId)
        .then(result => result.data.results[0])
        .then(recipe2 => {
          const db = app.database().ref().child('v/2/favs/' + user.uid)

          recipe = recipe2
          let res = []

          db.once('value').then(function (snapshot) {
            res = snapshot.val() ? snapshot.val() : []
            if (!Object.values(res).length) { return Object.values(res).map((recipe) => recipe) }
          })
            .then((results) =>
              _.findKey(results, { id: drinkId })
            )
            .then((results) => {
              if (results) {
                res = Object.entries(res)
                db.child(res[results][0]).remove()
                setIsSaved('default')
                console.log('recipe removed')
              } else {
                const newRecipe = db.push()
                newRecipe.set(recipe)
                setIsSaved('secondary')
                console.log('recipe saved')
              }
              setLoading(false)
            })
        })
        console.log(recipe)
    }

    // isSaved
  }, [isLoading])

  const handleClick = () => setLoading(true)

  // color="secondary"

  return (
    <>
      <IconButton aria-label='add to favorites' color={isSaved} disabled={isLoading} onClick={!isLoading ? handleClick : null}>
        <FavoriteIcon />
      </IconButton>
    </>
  )
}

export default AddRemoveButton
