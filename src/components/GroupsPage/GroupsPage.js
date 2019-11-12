import React from 'react';
import PostFeed from '../PostFeed/PostFeed';

import PostContext from '../../Context/Context';
import Error from '../Error/Error';
import TokenService from '../../services/token-services';
import Config from '../../config';
import './GroupsPage.css';
// this class displays the intro or landing page for a group.
// it displays the group name and about the group and who its for
// in a small box. the rest of the content are posts with the group id.
// it also checks if the user is in the group in the future
// which chooses to display a button saying whether the person is in the group
// or not.
class GroupsPage extends React.Component{
    static contextType = PostContext;

    // get the params
    static defaultProps = {
        match: { params: {} },
    }

    // store the group in the state
    state= {
        group: [],
        user: null,
        error: null,
        joined: [],
        prev: 0
    }

    // join the group
    joinGroup = async ()=>{
        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },

        }
        const fetchResponse = await fetch(`${Config.API_ENDPOINT}/member/${this.props.match.params.id}`, settings);
        const data = await fetchResponse.json();
        this.setState({
            joined: data,
            user: 'joined group'
        })
       
    }

    // leave the group
    leaveGroup = async ()=>{
        const settings = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },

        }
        const fetchResponse = await fetch(`${Config.API_ENDPOINT}/member/${this.props.match.params.id}`, settings);
        
        
        if(fetchResponse.status === 200){
           
            this.setState({
                user: null
            })
        }
    }

    // get the groups information
    getGroup = async () => {
       
        const settings = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
           
        }

        try {
            const fetchResponse = await fetch(`${Config.API_ENDPOINT}/groups/${this.props.match.params.id}`, settings);
            const data = await fetchResponse.json();
            this.setState({
                group: data
            });
        } catch (err) {
            this.setState({
                error: err
            })
        }
    }

    // get all posts fro group
    groupPosts = async () =>{
       
        const settings = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },

        }

        try{
            const fetchResponse = await fetch(`${Config.API_ENDPOINT}/posts/?id=${this.props.match.params.id}`, settings);
            const data = await fetchResponse.json();
            this.context.setPosts(data);
        }catch(err){
            this.setState({
                error: err
            })
        }
    }

    // checks if user is currently in the group
    // if not then show button else hide the button
    checkUser = async () => {
        const settings = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },

        }

        try {
            const fetchResponse = await fetch(`${Config.API_ENDPOINT}/member/${this.props.match.params.id}`, settings);
            const data = await fetchResponse.json();
           
            // if the suer isnt in the group.
            if(fetchResponse.status === 200){
                this.setState({
                    // user tells us if the user is in the group
                    user: data.user
                });
               
            }else{
                this.setState({
                    user: null
                })
              
            }
           
        } catch (err) {
            this.setState({
                error: err
            })
        }
    }

    // load the group data
    componentDidMount(){
        
        // get the group data
        this.getGroup();
        this.checkUser();
        this.groupPosts();
          
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.match.params.id !== prevProps.match.params.id){
          
            // get the group data
            this.getGroup();
            this.checkUser();
            this.groupPosts();
        }
    }

    // handles join request.
    // the page will update and the about will no longer display.
    // then will display a message stating welcome to the group
    handleSubmit = e =>{
        e.preventDefault();
       
        this.joinGroup();
    }

    handleLeave = e =>{
        e.preventDefault();
      
        this.leaveGroup();
    }


    // display the name of the group.
    renderGroupName(){
       
        if(this.state.group.name){
            return (
                <h1>{this.state.group.name}</h1>
            );
        }else{
            return(
                <Error err="Something went wrong"/>
            )
        }

    }

    renderAbout(){

        return (
            <div className="about-container">
                <h3>About</h3>
               
                <p>{this.state.group.about}</p>
                <h3>Who is this group for?</h3>
                <p>{this.state.group.level}</p>
                {/* this form adds the user into the group. 
                in the future you will be able to leave the group.
            */}
                {/* <button onClick={this.handleLeave}>Leave</button> */}
                {this.state.user
                    ? <button onClick={this.handleLeave}>Leave</button> 
                    : <button onClick={this.handleSubmit}>Join</button>}
              
                
            </div>
        );
        
        
    }

    renderWelcome(){
        if(this.state.joined.length > 0){
            return (
                <h4>Welcome to the group.</h4>
            );
        }
    }


    render(){
       
        return(
            <div className="groups-page">
                {/* if the user just joined the group welcome them */}
                {this.renderWelcome()}
                {/* displays the intro */}
                {this.renderGroupName()}
                {/* displays the remaining data */}
                {this.renderAbout()}
                <PostFeed />
            </div>
        );
    }
}

export default GroupsPage;