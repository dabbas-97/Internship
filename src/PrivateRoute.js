import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './Auth'

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { auth } = useAuth()


    return <Route
        {...rest}
        render={routeProps => !!auth.user ? (<RouteComponent {...routeProps} />) : (<Redirect to={"/"} />)} />


}


export default PrivateRoute;