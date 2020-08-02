import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { AuthContext } from 'components/_Auth'
import app from 'components/_Firebase'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    minWidth: '100%'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    overflowX: 'overlay',
    scrollSnapType: 'x mandatory',
    minWidth: '100%'
  },
  gridListTile: {
    scrollSnapAlign: 'start',
    minHeight: '100%',
    minWidth: '100%'
  },
  title: {
    color: theme.palette.warning.light
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}))

const Landing = () => {
  const classes = useStyles()

  const tileData = [
    {
      img: 'assets/mood-0-after-work.jpg',
      title: 'After Work',
      to: '/after-work'
    },
    {
      img: 'assets/mood-1-sad.jpg',
      title: 'Feeling blue...',
      to: '/blue'
    },
    {
      img: 'assets/mood-2-party.jpg',
      title: 'Time to party',
      to: '/party'
    },
    {
      img: 'assets/mood-3-easy.jpg',
      title: 'Easy option',
      to: '/easy'
    },  
    {
      img: 'assets/mood-4-safe.jpg',
      title: 'Feeling safe',
      to: '/safe'
    },
    {
      img: 'assets/mood-5-suprise.jpg',
      title: 'Surprise me!',
      to: '/surprise'
    }
  ]

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={1}>
        {tileData.map((tile) => {
          return (
            <GridListTile key={tile.img} to={tile.to} component={Link} className={classes.gridListTile}>
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title
                }}
              />
            </GridListTile>
          )
        })}
      </GridList>
    </div>
  )
}

export default Landing
