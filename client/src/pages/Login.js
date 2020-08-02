import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from 'react-router'
import { Button, TextField, Typography, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { AuthContext } from 'components/_Auth'
import app from 'components/_Firebase'

const useStyles = makeStyles((theme) => ({
  root: {

  },
  App: {
    textAlign: 'center',
    backgroundColor: '#ffffff'
  },
  AppHeader: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white'
  },
  Login: {
    display: 'flex',
    flexDirection: 'column',
    alignitems: 'center',
    justifyContent: 'center',
    border: '1px solid lightgray',
    padding: '50px'
  },
  Button: {
    padding: '40px'
  },
  Link: {

  }
}))

const Login = ({ history }) => {
  const classes = useStyles()
  // const [ message, setMessage ] = useState('')

  //   open: false

  const handleLogin = useCallback(
    async event => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
        history.push('/')
      } catch (error) {
        alert(error)
      }
    },
    [history]
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to='/' />
  }

  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <form className={classes.Login} noValidate autoComplete='off' onSubmit={handleLogin}>
          <Typography variant='subtitle1' color='textPrimary'>
            Login
          </Typography>
          <TextField
            variant='standard'
            placeholder='Email'
            margin='normal'
            type='email'
            name='email'
            required
          />
          <TextField
            variant='standard'
            placeholder='Password'
            margin='normal'
            required
            type='password'
            name='password'
          />

          <div className={classes.Button}>
            <Button
              variant='contained'
              color='primary'
              type='submit'
            >
              Log In
            </Button>
          </div>
          <div className={classes.register}>
            <Typography variant='caption' color='textPrimary'>
              Don't have an account, <Link href='/register' component={Link}>register now</Link>!
            </Typography>
          </div>
        </form>
      </header>
    </div>
  )
}

export default withRouter(Login)
