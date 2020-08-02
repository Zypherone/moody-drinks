import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'

import AppLayout from 'components/App/Content/index.js'
import AppBottomBar from 'components/App/BottomBar'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'fixed',
    overflow: 'overlay',
    left: '0',
    top: '0',
    bottom: '56px ',
    right: '0',
    padding: theme.spacing(1),
    paddingTop: '56px'
  }
}))

const AppContent = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path='*'>
            <AppLayout />
          </Route>
        </Switch>
        <AppBottomBar className={classes.AppBottomBar} />
      </Router>
    </div>
  )
}

// export default AppContent;

export default AppContent
