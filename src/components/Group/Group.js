import React from 'react';
import {Link} from 'react-router-dom';
import Error from '../Error/Error';
import TokenService from '../../services/token-services';
import Config from '../../config';
import PostContext from '../../Context/Context';

// Group is going to used in the menu to get a list of all
// groups the user is currently active in. 
// then displays as a drop down from the menu
class Group extends React.Component{
    static contextType = PostContext;

    static defaultProps = {
        show: ''
    }

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
            this.context.setUserGroups(data);
           
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
        if(this.context.userGroups.length > 0){
            
            return (
              <>
                {this.context.userGroups.map(group => (
                  <li className={this.props.show} key={group.id}>
                    <Link to={`/group/${group.id}`}>{group.group_name}</Link>
                  </li>
                ))}
              </>
            );
        }
    }

    render(){
        return (
          <>
            {this.state.error ? <Error err={this.state.error.error} /> : null}
            {this.renderGroups()}
          </>
        );
    }
}
export default Group;