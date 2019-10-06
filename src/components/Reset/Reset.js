import React from 'react';
import authApi from '../../auth-service/auth-service';

class Reset extends React.Component{

    // get the params
    static defaultProps = {
        match: { params: {} },
    }

    state={
        user_name: null,
        passwordError: null,
        error: null
    }

    // redirects user to the login page when succesful
    redirectLogin(){
        const { history } = this.props
        history.push('/login');
    }


    // get the username first display it on the screen and use it to change the pass
    componentDidMount(){
       
        const { token } = this.props.match.params
        authApi.getUsername(token)
            .then(user=>{
                
                if (user === 'password reset link is invalid or has expired'){
                    this.setState({
                        error: user
                    })
                }else{
                    this.setState({
                        user_name: user
                    })
                }
                
            })
    }

    // check passwords match
    repeatOnChange = () => {
        const og = document.getElementById('password_reset').value;

        const repeat_password = document.getElementById('pass_repeat').value;

        if (og !== repeat_password) {
            this.setState({
                passwordError: 'passwords do not match'
            })
        } else {
            this.setState({
                passwordError: null
            })
        }
    }

    handleSubmit = e =>{
        e.preventDefault();
        const {password, repeat_pass} = e.target;
        authApi.updatePassword( this.state.user_name ,repeat_pass.value)
            .then(res=>{
                if (res === 'update succesful'){
                    password.value = '';
                    repeat_pass.value = '';
                    // redirect to login
                    this.redirectLogin();

                }else{
                    this.setState({
                        passwordError: res.error
                    })
                }
            })

    }

    // displays only the form
    renderResetPasswordPage(){
        return(
           
                <form className="gen-form" onSubmit={this.handleSubmit}>
                    {this.state.passwordError
                    ? <p className="red">{this.state.passwordError}</p>
                    : null}
                    <label>New password</label>
                    <input id="password_reset" type="password" name="password" required/>

                    <label>Repeat password</label>
                    <input id="pass_repeat" type="password" name="repeat_pass" onChange={this.repeatOnChange}/>

                    <button type="submit">Submit</button>
                </form>
        )
    }


    render(){
        return(
            <div className="resest-password">
                <header><h1>{this.state.user_name}</h1></header>
                {this.state.error
                ? <p>{this.state.error}</p>
                : this.renderResetPasswordPage()}
            
            </div>
        )
    }

}

export default Reset;