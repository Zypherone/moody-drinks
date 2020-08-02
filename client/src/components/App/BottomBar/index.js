import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AppsIcon from '@material-ui/icons/Apps'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '0',
    left: 'auto',
    right: '0',
    zIndex: '1100',
    width: '100%',
    boxShadow: '0px -4px 5px #bdbdbd40',
    borderTop: '1px solid #eee'
  }
}))

export default function AppBottomBar (props) {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const location = useLocation()

  // console.log(location)

  useEffect(() => {
    if (location.pathname === '/favs') { setValue(1) }
  })

  return (

    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
      component='footer'
    >
      <BottomNavigationAction label='Home' icon={<AppsIcon />} component={Link} to='/' />
      <BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} component={Link} to='/favs' />
      {/* <BottomNavigationAction label="Recents" icon={<RestoreIcon />} to="/recents" /> */}
    </BottomNavigation>

  )
}
