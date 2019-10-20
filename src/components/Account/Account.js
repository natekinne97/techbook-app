import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import TokenService from '../../services/token-services';
import Config from '../../config';

import './Account.css';

// this account will be used to make patch requests on the 
// user to change basic information
// such as occupation and bio 
class Account extends React.Component{
    static defaultProps = {
        user_id: ''
    }

    state = {
        accountInfo: [],
        error: null
    }

    componentDidMount(){

        fetch(`${Config.API_ENDPOINT}/users/profile`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res => (res.ok ? res : Promise.reject(res)))
            .then(res => res.json())
            .then(res => this.setState({
                accountInfo: res
            }))
            .catch(err => this.setState({error: err}));
    }

    renderAccountInfo(){
       
        return (
            
            <div className="basic">
                <div className="edit-button">
                    {!this.props.user_id
                        ? <Link to="/edit-profile">
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </Link>
                        : null}
                </div>
                <h4>Username</h4>
                <p>{this.state.accountInfo.user_name}</p>

                <h4>Full name</h4>
                <p>{this.state.accountInfo.full_name}</p>

                <h4>Bio</h4>
                <p> 
                  {!this.state.accountInfo.bio
                    ? <p>Add a bio</p>
                    : this.state.accountInfo.bio}
                
                </p>
                <h3>Occupation</h3>
                <p>
                    {!this.state.accountInfo.occupation
                        ? <p>Add a bio</p>
                        : this.state.accountInfo.occupation}
                </p>
            </div>    
           
        );
    

    }

    render(){
        
        return(
            <div className="account">
                {this.renderAccountInfo()}
            </div>
        );
    }
}

export default Account;