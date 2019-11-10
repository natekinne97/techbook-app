import React from 'react';
import AuthApiService from '../../auth-service/auth-service';


class ForgotPassword extends React.Component{

    state={
        sent: false,
        wait: null,
        error: ''
    }

    handleSubmit =  e =>  {
        e.preventDefault();
        const {email} = e.target;
        
        this.setState({
            wait: 'May take a moment',
            error: null
        })
        // sending request for email
        AuthApiService.emailReset({email: email.value})
            .then(res=>{
                this.setState({
                    sent: true,
                    wait: ''
                })
                email.value = ''
            }).catch(error=>{
                console.log(error, 'error');
                this.setState({
                    sent: false,
                    error: error
                })
            })

    }

    render(){
        const sentMessage = "Email sent. Please follow the link for to reset your password.";
        return(
            <div className="gen-form">
                {this.state.sent
                ? <p>{sentMessage}</p>
                : null}
                {/* display feedback for long wait */}
                {this.state.wait
                ? <p>{this.state.wait}</p>
                : null}

                {this.state.error
                ? <p className="red">error occured</p>
                : null}

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email: </label>
                    <input name="email" type="text"/>
                    <button type="submit">Recover password</button>
                </form>

            </div>
        )
    }

}
export default ForgotPassword;