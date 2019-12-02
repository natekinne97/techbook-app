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
class Account extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    },
    match: { params: {} },
    prev: ""
  };
  

  state = {
    accountInfo: [],
    error: null,
    friendStatus: []
  };

  // handle submits for adding a friend
  addFriend = async () => {
    const settings = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    };

    const url = `${Config.API_ENDPOINT}/friends/${this.props.match.params.id}`;

    const fetchResponse = await fetch(url, settings);
    const data = await fetchResponse.json();
    // update friends status
    this.setState({
      friendStatus: data
    });
  };

  // handle submits for adding a friend
  removeFriend = async () => {
    const settings = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    };

    const url = `${Config.API_ENDPOINT}/friends/${this.props.match.params.id}`;

    const fetchResponse = await fetch(url, settings);
    const data = await fetchResponse.json();
    // update friends status
    this.setState({
      friendStatus: data
    });
  };


  // trigger the friend adding.
  handleSubmit = () => {
    this.addFriend();
  };

  /*
        on load get the data

    */

  geturl() {
    let url;
    let id;
    // check if an id is being used
    if (this.props.match.params.id) {
      id = this.props.match.params.id;
    }
    // check if we are looking at the current users account or a different one
    if (Number(id) > 0) {
      url = `${Config.API_ENDPOINT}/users/profile?profile=${id}`;
    } else {
      // load the users profile
      url = `${Config.API_ENDPOINT}/users/profile`;
    }

    return url;
  }

  fetchUserProfile = async () => {
    let url = this.geturl();

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
      accountInfo: data
    });
  };

  // checks friend status. if already friends or not
  checkFriendStatus = async () => {
    const url = `${Config.API_ENDPOINT}/friends/check/${this.props.match.params.id}`;

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
      friendStatus: data
    });
  };

  componentDidMount() {
    this.fetchUserProfile();
    // we only want to check friend status if there is an id in the
    // params
    if (this.props.match.params.id) {
      this.checkFriendStatus();
    }
  }

  renderAccountInfo() {
     
    return (
      <div className="basic">
        <div className="edit-button">
          {/* check if user owns the account */}
          {!this.props.match.params.id ? (
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faPencilAlt} />
            </Link>
          ) : null}
          {/* if they dont own the account check
                    if they are friends and if not display the button */}
          {this.state.friendStatus.message ? (
            <button onClick={this.handleSubmit}>Add Friend</button>
          ) : null}
        </div>
        <h4>Username</h4>
        <p>{this.state.accountInfo.user_name}</p>

        <h4>Full name</h4>
        <p>{this.state.accountInfo.full_name}</p>

        <h4>Bio</h4>

        {!this.state.accountInfo.bio ? (
          <p>Add a bio</p>
        ) : (
          this.state.accountInfo.bio
        )}

        <h3>Occupation</h3>

        {!this.state.accountInfo.occupation ? (
          <p>Add a bio</p>
        ) : (
          this.state.accountInfo.occupation
        )}
      </div>
    );
  }

  render() {
    return <div className="account">{this.renderAccountInfo()}</div>;
  }
}

export default Account;