import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import TokenService from '../../services/token-services';
import Config from '../../config';

import './Account.css';

// next we need to make a route to check the user
// on mount then we need to check that the id sent is not the current user


// this account will be used to make patch requests on the 
// user to change basic information
// such as occupation and bio 
class Account extends React.Component{

    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
        match: { params: {} },
        prev: ''
    }
    
    state = {
        accountInfo: [],
        error: null
    }

    componentDidMount(){
        let url;
        try{
            if (this.props.match.params.id){
                const id = this.props.match.params.id;
                console.log(id);
                this.setState({
                    pev: id
                })
            }
        }catch(err){
            console.log(err);
        }
        let id;
        if (this.props.match.params.id) {
            id = this.props.match.params.id;
            console.log(id);
            
        }
       
        // check if we are looking at the current users account or a different one
        if(Number(id) > 0){
            console.log('using id')
            url = `${Config.API_ENDPOINT}/users/profile?profile=${id}`;
        }else{
            console.log('current user')
            // load the users profile
            url = `${Config.API_ENDPOINT}/users/profile`;
        }

         

        // get the users profile
        fetch(url, {
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
                    {/* check if user owns the account */}
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
                
               {!this.state.accountInfo.bio
                ? <p>Add a bio</p>
                : this.state.accountInfo.bio}
                
               
                <h3>Occupation</h3>
                
                {!this.state.accountInfo.occupation
                ? <p>Add a bio</p>
                : this.state.accountInfo.occupation}
                
            </div>    
           
        );
    

    }

    render(){
        console.log('hello i am working');
        // console.log(this.props.match.params.id);
        return(
            <div className="account">
                {this.renderAccountInfo()}
            </div>
        );
    }
}

export default Account;