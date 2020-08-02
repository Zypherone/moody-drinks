import React, { useCallback } from 'react'
import { withRouter } from 'react-router'

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
  }
}))

const SignUp = ({ history }) => {
  const classes = useStyles()

  const handleSignUp = useCallback(async event => {
    event.preventDefault()
    const { email, password } = event.target.elements
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
      history.push('/')
    } catch (error) {
      alert(error)
    }
  }, [history])

  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <form className={classes.Login} noValidate autoComplete='off' onSubmit={handleSignUp}>
          <Typography variant='subtitle1' color='textPrimary'>
            Register
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
              Already have an account, <Link href='/login' component={Link}>login now</Link>!
            </Typography>
          </div>
        </form>
      </header>
    </div>
  )

  // return (
  //   <div>
  //     <h1>Sign up</h1>
  //     <form onSubmit={handleSignUp}>
  //       <label>
  //         Email
  //         <input name="email" type="email" placeholder="Email" />
  //       </label>
  //       <label>
  //         Password
  //         <input name="password" type="password" placeholder="Password" />
  //       </label>
  //       <button type="submit">Sign Up</button>
  //     </form>
  //   </div>
  // );
}

export default withRouter(SignUp)
