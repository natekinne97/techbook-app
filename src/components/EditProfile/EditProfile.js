import React from 'react'

import TokenService from '../../services/token-services';
import Config from '../../config';
import Error from '../Error/Error';

import './EditProfile.css';
// this component allows editing of account. on submit will be redirect to
// the account page
class EditProfile extends React.Component{
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }


    state = {
        accountInfo: [],
        error: null
    }

    redirect = () => {
        const { history } = this.props
        // check if last loaded page was login
        if (localStorage.lastUrl === '/login') {
            history.push('/account')
        } else {
            history.push(localStorage.lastUrl);
        }
    }

    // get the information for population
    componentDidMount() {

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
            .catch(err => this.setState({ error: err }));
    }

    // submit data to server
    updateProfile = async data=>{
        const settings = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(data)
        }

        try {
            const fetchResponse = await fetch(`${Config.API_ENDPOINT}/users/update-user`, settings);
            const resp = await fetchResponse.json();
            console.log(resp, 'data');
            
        } catch (e) {
            
        }
    }

    // handle the submit. make a patch request
    handleSubmit = e =>{
        e.preventDefault();
        const {user_name, full_name, bio, occupation} = e.target;
        const updateUser = {
            user_name: user_name.value,
            full_name: full_name.value,
            bio: bio.value,
            occupation: occupation.value
        };
        // set all back to null
        user_name.value = '';
        full_name.value = '';
        
        occupation.value = '';
        this.updateProfile(updateUser);
        this.redirect();
    }

    // render the form
    renderForm = ()=>{
        return(
            <form className="account-edit" onSubmit={this.handleSubmit}>
                {this.state.error
                ? <Error err={this.state.error}/>
                : null}
                <label htmlFor="user_name">Username:</label>
                <input type="text" name="user_name" value={this.state.accountInfo.user_name} required/>
                
                <label htmlFor="full_name">Full name</label>
                <input type="text" name="full_name" value={this.state.accountInfo.full_name}/>

                <label htmlFor="bio">Bio</label>
                <textarea name="bio" required>
                        {this.state.accountInfo.bio}
                </textarea>
                

                <label htmlFor="occupation">Occupation</label>
                <input type="text" name="occupation" required/>
                <button type="submit">Submit</button>
            </form>
        );
    }


    render(){
        return(
           <div className="edit-account-container">
               <h1>Edit Profile</h1>
               {this.renderForm()}
           </div>
        )
    }
}
export default EditProfile;