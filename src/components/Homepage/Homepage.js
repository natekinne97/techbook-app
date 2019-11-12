import React from 'react';
import {Link} from 'react-router-dom';
import './Homepage.css'
import PostContext from '../../Context/Context';
import Login from '../Login/Login';

// this is the landing page or homepage.
// when the user enters the site the will get this and a brief description
// of the site. the user must login to get any features at all.
class Homepage extends React.Component{
    static contextType = PostContext;
    
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    handleLoginSuccess = user => {
        const { history } = this.props
        this.context.setUser(user)

        history.push('/home');
    }



    render(){
        return(
            <div className="homepage">
                <div className="intro">
                    <p>
                        TechBook is a social media style forum for all your tech 
                        questions. All you have to do is sign up to start asking 
                        questions, start discussions, get news, or even share your 
                        projects.  
                    </p>
                    <p>
                        If you don’t want to create an account here are the demo 
                        credentials:
                    </p>
                    <p>
                         Username: c.bloggs
                    </p>
                    <p>
                        Password: charzard
                    </p>
                </div>
               
                <div className="login-container">
                    <h3>Login</h3>
                    <Login onLoginSuccess={this.handleLoginSuccess}/>
                    <Link to="/forgot-password">
                        Forgot password?
                    </Link>
                    <Link id="signup" to="/signup">
                        Signup
                    </Link>
                </div>

            </div>
        );
    }

}

export default Homepage;