import React from 'react';
import authApi from '../../auth-service/auth-service';
import './CreateAccount.css';

// future error checking will include username and password
class CreateAccount extends React.Component {

    static defaultProps = {
        onCreateSuccess: () => { }
    }

    state={
        match: '',
        error: false
    }


    // check passwords match
    repeatOnChange = () =>{
        const og = document.getElementById('password').value;
       
        const repeat_password = document.getElementById('repeat-password').value;
        
        if(og !== repeat_password){
           
            this.setState({
                match: 'Passwords do not match.',
                error: true                
            })
        }else{
            this.setState({
                math: '',
                error: false
            })
        }
    }

    // handle submit
    handleSubmit = e =>{
        e.preventDefault();
        const {user_name, email, first_name, last_name,repeat_password, password} = e.target;
        const newUser = {
            user_name: user_name.value,
            email: email.value,
            password: repeat_password.value,
            full_name: first_name.value +' ' + last_name.value 
        }




        authApi.postUser(newUser)
            .then(res=>{
                // reset the values
                user_name.value = '';
                email.value = '';
                repeat_password.value = '';
                password.value = '';
                first_name.value = '';
                last_name.value = '';
                // redirect to home page
                this.props.onCreateSuccess();
            }).catch(error=>{
                console.log(error);
                this.setState({error});
            })

    }

    render() {
        return (
            <div className="create-account">
                <header>Create Account</header>
                <form className="account-form gen-form" onSubmit={this.handleSubmit}>
                    {this.state.error
                        ? <p>{this.state.error.error}</p>
                    : null}

                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" name="user_name" onChange={this.testForSpaces} required/>

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required/>

                    <label htmlFor="first_name">First name</label>
                    <input type="text" name="first_name" required/>

                    <label htmlFor="last_name">Last name</label>
                    <input type="text" name="last_name"/>
                   
                    {this.state.error
                    ? <p>{this.state.match}</p>
                    : null}

                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" required/>

                    <label htmlFor="repeat-password">Repeat password</label>
                    <input id="repeat-password" type="password" name="repeat_password" onChange={this.repeatOnChange} required/>

                    <button type="submit">Sign Up</button>

	        	</form>
            </div>
        );
    }
}

export default CreateAccount;