import React from 'react'
import clsx from 'clsx'
import {
  Route,
  Switch,
  useLocation,
  useParams
} from 'react-router-dom'
import { useTransition, animated } from 'react-spring'

import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

// import AppTopBar from 'components/App/TopBar';
import PageLanding from 'components/Landing'
import PageResults from 'components/Results'

import app from 'components/_Firebase'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start'
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth,
    minHeight: '100%',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3)
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  },
  container: {
    height: '100%',
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2)
  }
}))

export default function AnimationApp (props) {
  const location = useLocation()
  const { 0: page } = useParams()
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: 'translate(100%, 0)' },
    enter: { opacity: 1, transform: 'translate(0%, 0)' },
    leave: { opacity: 0, transform: 'translate(-50%, 0)' }
  })

  // if (page == '/') {
  //   transitions = useTransition(location, location => location.pathname, {
  //     from: { opacity: 0, transform: "translate(100%, 0)", display: 'flex', flexGrow: 1, height: '100%' },
  //     enter: { opacity: 1, transform: "translate(0%, 0)", display: 'flex', flexGrow: 1, height: '100%' },
  //     leave: { opacity: 0, transform: "translate(-50%, 0)", display: 'flex', flexGrow: 1, height: '100%' }
  //   });
  // }

  // console.log(page)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <Typography variant='h6' noWrap className={classes.title}>
            Moody Drinks v2
          </Typography>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='end'
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        {/* <Container class={classes.container} maxWidth="sm"> */}
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props} id={page === '/' ? 'Landing' : page.substr(1)}>
            <Switch location={item}>
              {/* <Route exact path="/results/:type" children={<PageResults />} />
              <Route exact path="/folder/:type" children={<PageResults />} /> */}
              <Route exact path='/' children={<PageLanding />} />
              <Route exact path='/login' children={<PageLanding />} />
              <Route exact path='/register' children={<PageLanding />} />
              <Route exact path='/:pagename' children={<PageResults />} />

              {/* <Route path="*" children={<PageLanding />} /> */}
            </Switch>
          </animated.div>
        ))}
        {/* </Container> */}
      </main>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='right'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Sign Out'].map((text, index) => (
            <ListItem button key={text} onClick={() => app.auth().signOut()}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

    </div>
  )
}

// function NavLink(props) {
//   return (
//     <li>
//       <Link {...props} style={{ color: "inherit" }} />
//     </li>
//   );
// }

// function HSL() {
//   let { h, s, l } = useParams();

//   return (
//     <div>
//       hsl({h}, {s}%, {l}%)
//     </div>
//   );
// }

// function RGB() {
//   let { r, g, b } = useParams();

//   return (
//     <div>
//       rgb({r}, {g}, {b})
//     </div>
//   );
// }
