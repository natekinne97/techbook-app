import React from 'react';
import './Login.css';
import authApi from '../../auth-service/auth-service';
import TokenService from '../../services/token-services';

class Login extends React.Component {
   

    static defaultProps = {
        onLoginSuccess: () => { }
    }

    state = {
        error: null
    }

    handleSubmit = e => {
        e.preventDefault();
        const { username, password } = e.target;
       
        
        authApi.postLogin({
            user_name: username.value,
            password: password.value,
        })
            .then(res => {
                username.value = ''
                password.value = ''
               
                // save token
                TokenService.saveAuthToken(res.authToken)

                this.props.onLoginSuccess(res.user);
            }).catch(error => {
                console.log(error.error, 'error');
                this.setState({
                    error: error.error
                })
            })
    }

    render() {
        return (
            <div className="login">
                <header>Login</header>
                {this.state.error
                    ? <p className="red">{this.state.error}</p>
                    : null}

                <form className="login-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required />

                    <button type="submit">Login</button>
                </form>

            </div>
        );
    }
}

export default Login;