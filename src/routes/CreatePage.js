import React, { Component } from 'react'
import CreateAccount from '../components/Create-Account/CreateAccount';

// handles login actions 
export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    onCreate = () => {
        const { history } = this.props
        history.push('/home');
    }

    render() {
        return (
            <React.Fragment>
                <CreateAccount
                    onCreateSuccess={this.onCreate}
                />
            </React.Fragment>

        )
    }
}
