import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from 'components/_Auth'
import PrivateRoute from 'components/_PrivateRoute'
import 'App.css'

// import Content from "pages/Content";
import Login from 'pages/Login'
import Register from 'pages/Register'
import AppContent from 'pages/AppContent'

// import Dummy from 'pages/Dummy'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute path='*' component={AppContent} />
      </Router>
    </AuthProvider>
  )
}

export default App
