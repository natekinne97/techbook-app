import React from 'react';
import './CreateGroup.css';


import Error from '../Error/Error';
import TokenService from '../../services/token-services';
import Config from '../../config';
// this component allows the user to create a new group forum topic
// one that specifically aligns with their technical niche
class CreateGroup extends React.Component{
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }


    // state for redirect
    state = {
        group: [],
        error: null
    }

    redirectGroup(){
        const {history} = this.props;
        history.push(`/group/${this.state.group.id}`)
    }
    
    // async call to fetch
    insertGroup = async newGroup =>{
        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(newGroup)
        }

       try{
           console.log('sending to api')
           const fetchResponse = await fetch(`${Config.API_ENDPOINT}/groups/`, settings);
           const data = await fetchResponse.json();
           console.log(data.id, 'data id')
           console.log('setting state')
           this.setState({
               group: data
           });
           this.redirectGroup();
       }catch(err){
           this.setState({
               error: err
           })
       }
    }

    // handle submit
    handleSubmit = e =>{
        e.preventDefault();
        // clear error
        this.setState({
            error: null
        })
        console.log('new group submitted');
        // get data from inputs
        const {name, about, level} = e.target;

        // object to send
        const newGroup = {
            group_name: name.value,
            about: about.value,
            exp_lvl: level.value
        }

        this.insertGroup(newGroup);
        
    }

    // a call a to redirect to newly creater page

    render(){
        return(
            <div className="group-container">
                <h1>New group</h1>
                <form className="group-form" onSubmit={this.handleSubmit}>

                    {this.state.error
                    ? <Error err={this.state.error}/>
                    : null}

                    <label htmlFor="name">Group Name:</label>
                    <input type="text" name="name"/>

                    <label htmlFor="about">About</label>
                    <textarea name="about"></textarea>

                    <label htmlFor="level">What experience level is this for?</label>
                    <input type="text" name="level"/>

                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
export default CreateGroup;