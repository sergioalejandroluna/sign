import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import UserStore from '../stores/UserStore'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    UserStore.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
)

export default PrivateRoute;
