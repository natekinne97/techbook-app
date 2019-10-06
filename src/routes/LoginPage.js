import React, { Component } from 'react'
import LoginForm from '../components/Login/Login'

// handles login actions 
export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    handleLoginSuccess = () => {
        const { history } = this.props
        // check if last loaded page was login
        if (localStorage.lastUrl === '/login') {
            history.push('/')
        } else {
            history.push(localStorage.lastUrl);
        }
    }

    render() {
        return (
            <React.Fragment>
                <LoginForm
                    onLoginSuccess={this.handleLoginSuccess}
                />
            </React.Fragment>

        )
    }
}
