import React from 'react';
import {Link} from 'react-router-dom';
import Error from '../Error/Error';
import TokenService from '../../services/token-services';
import Config from '../../config';

// Group is going to used in the menu to get a list of all
// groups the user is currently active in. 
// then displays as a drop down from the menu
class Group extends React.Component{

    state = {
        groups: [],
        error: null
    }

    // make the async call to load all groups associated with user.
    getGroups = async ()=>{
        try{
            const settings = {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`,
                },

            }
            const fetchResponse = await fetch(`${Config.API_ENDPOINT}/member/users-groups`, settings);
            const data = await fetchResponse.json();
            console.log(data, 'data for groups')
            this.setState({
                groups: data
            })
            console.log('state set')
        }catch(err){
            this.setState({
                error: err
            })
        }
    }


    componentDidMount(){
        this.getGroups();
    }

    renderGroups(){
        if(this.state.groups.length > 0){
            console.log('working so far');
            return (
                <>
                    {this.state.groups.map(group=>(
                        <li><Link to={`/group/${group.id}`}>
                        {group.group_name}
                        </Link></li>
                    ))}
                </>
            );
        }
    }

    render(){
        return(
            <ul className={this.props.show}>
                {this.state.error
                ? <Error err={this.state.error}/>
                : null}
                {this.renderGroups()}
            </ul>
        );
    }
}
export default Group;