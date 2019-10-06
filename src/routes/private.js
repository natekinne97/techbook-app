import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../services/token-service';

// redirects user if they are not logged in for action
export default function PrivateRoute({component, ...props}){
    const Component = component

    return (
        <Route
            {...props}
            render={componentProps => (
                TokenService.hasAuthToken()
                    ? <Component {...componentProps} />
                    : <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: componentProps.location }
                        }}
                    />
            )}
        />
    )
}