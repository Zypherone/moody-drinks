import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from 'components/_Auth'

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={routeProps => {
        const { location } = routeProps

        return currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          location.pathname === '/register' ? (
            <Redirect to='/register' />
          ) : (
            <Redirect to='/login' />
          )
        )
      }}
    />
  )
}

export default PrivateRoute
