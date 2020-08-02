
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
//import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { red } from '@material-ui/core/colors'

import AddRemoveButton from 'components/AddRemoveButton'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: theme.spacing(3)
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}))

const RecipeDetails = (props) => {
  const {
    id
    , name
    , thumb
    , instructions
    , ingredients
    , saveRecipe
  } = props.recipe

  // const action = props.deleteBook ? 'delete' : 'save';
  // const typeOfButton = props.deleteBook ? props.deleteBook : props.saveBook;

  const typeOfButton = saveRecipe

  const classes = useStyles()

  const [expanded, setExpanded] = useState(false)
  const [checked, setChecked] = useState([0])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  // const { name } = props;
  // const action = props.deleteBook ? 'delete' : 'save';
  // const typeOfButton = props.deleteBook ? props.deleteBook : props.saveBook;\\

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar} src={thumb} />
          }
          title={name}
          subheader='September 14, 2016'
        />
        <CardMedia
          className={classes.media}
          image={thumb}
          title='Paella dish'
        />
        <CardActions disableSpacing>
          <AddRemoveButton id={id} typeOfButton={typeOfButton} />
          {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography variant='subtitle2'>Ingredients:</Typography>

            {(ingredients.length !== 0) ? (
              ingredients.map((ing) => {
                const value = `ing-${id}-${ing.name}`
                const labelId = `checkbox-list-label-${value}`
                return (
                  <ListItem key={value} role={labelId} dense button onClick={handleToggle(value)}>
                    <ListItemIcon>
                      <Checkbox
                        edge='start'
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${ing.name} ${ing.name}`} />
                  </ListItem>
                )
              })
            ) : (
              <p>No Results</p>
            )}
            <Typography variant='subtitle2'>Method:</Typography>
            <Typography paragraph>
              {instructions}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  )
}

export default RecipeDetails
