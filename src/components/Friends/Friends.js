import React from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../../services/token-services';
import Config from '../../config';
import './Friends.css';
class Friends extends React.Component{
    // for getting the params
    static defaultProps = {
        id: null, 
        match: { params: {} },
    };

    state={
        friends: []
    }

    // returns a different url depending on who the user is looking at.
    geturl() {
        let url;
        let id = this.props.id;
       
        // check if we are looking at the current users account or a different one
        if (Number(id) > 0) {
           
            url = `${Config.API_ENDPOINT}/friends/?id=${id}`;
        } else {
            // load the users profile
            url = `${Config.API_ENDPOINT}/friends/`;
        }

        return url;
    }

    getAllFriends = async ()=>{
        const url = this.geturl();
        const settings = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${TokenService.getAuthToken()}`
            }
        };
        const fetchResponse = await fetch(url, settings);
        const data = await fetchResponse.json();
       
        this.setState({
            friends: data
        })

    }

    componentDidMount(){
        this.getAllFriends();
    }

    componentDidUpdate(nextProps){
        if(nextProps.id !== this.props.id){
            this.getAllFriends();
        }
    }

    displayFriends(){
      
        if(this.state.friends.length > 0){
           
            return(
                <div className="friend-container">
                    <h3>Friends</h3>
                    <div className="friend-border">
                        {this.state.friends.map((friend, index) => (
                            <div key={index ** 3} className="friend">
                                <h4>
                                    <Link to={`/account/${friend.friends_id}`} className="friend-name">
                                        {friend.friend_name}
                                    </Link>
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }

    render(){
        return(
            <div className="friends">
                {this.displayFriends()}
            </div>
        );
    }
}

export default Friends;