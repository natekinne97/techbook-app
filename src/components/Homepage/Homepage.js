import React from 'react';
import {Link} from 'react-router-dom';
import './Homepage.css'

import Login from '../Login/Login';

// this is the landing page or homepage.
// when the user enters the site the will get this and a brief description
// of the site. the user must login to get any features at all.
class Homepage extends React.Component{

    render(){
        return(
            <div className="homepage">
                <div className="intro">
                    <p>
                        TechBook is the social media forum
                        Where you can get answers to questions, start discussions,
                        get news, or even share your projects.
                        Site under construction press 'Home' in the menu to continue.
                    </p>
                </div>
               
                <div className="login-container">
                    <h3>Login</h3>
                    <Login/>
                    <Link to="/forgot">
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