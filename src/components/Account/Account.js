import React from 'react';
import './Account.css';

// this account will be used to make patch requests on the 
// user to change basic information
// such as occupation and bio 
class Account extends React.Component{

    render(){
        return(
            <div className="account">
                <div className="basic">
                    <h4>Username</h4>
                    <p>bob's burgers</p>
                    
                    <h4>Full name</h4>
                    <p>Bobert Burger</p>
                    
                    <h4>About</h4>
                    <p> 
                        A burger flipper during the day 
                        and I spend my nights messing around with react.
                    
                    </p>

                    <h3>Occupation</h3>
                    <p>Restaurant owner</p>

                </div>

            </div>
        );
    }
}

export default Account;