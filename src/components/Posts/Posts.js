import React from 'react';

import Config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faArrowDown} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import PostContext from '../../Context/Context';
import Error from '../Error/Error';
import Comments from '../Comments/Comments';

import TokenService from '../../services/token-services';
import './Posts.css';



class Posts extends React.Component{
    static contextType = PostContext;
    // we are going to track the click of the votes on the server side
    // We are going to track submits by using the onClick
    // the server will send us a new number and that number with post id and 
    // upvote.
    // the server will also send back an updated comment number.

    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
        match: { params: {} },
    }

    // handle votes.
    vote = async vote => {
        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(vote)
        }

        try {
            const fetchResponse = await fetch(`${Config.API_ENDPOINT}/votes/`, settings);
            const data = await fetchResponse.json();
            // if the sum increased then add it to the posts and refresh
            if(data[0].sum){
                let post = this.context.posts.find(post => post.id === vote.post_id);
                post.sum = data[0].sum;
                this.context.setPosts(this.context.posts);
            }
        } catch (e) {
            console.log(e)
        }
    }

    state={
        votes: 0,
        posts: [],
        // displays comments only for the single post
        showComments:{

        },
        currentParam: 0,
        addBar: '',
    }


    // fake data to show the static users the basics
    upVote = (position, id) =>{
        
        if(position === 'up'){
            const newVote = {
                vote: 1,
                post_id: id
            }
            
            this.vote(newVote);
        }else if(position === 'down'){
            const newVote = {
                vote: -1,
                post_id: id
            }
            
            this.vote(newVote);
        }else{
            console.log('Must be a string up or down')
        }
    }

    setVotes = votes =>{
        this.setState({
            votes
        })
    }



    // for sending the id to the comments on which post to display comments
    commentsClicked = id =>{
        
        this.setState({
            addBar: 'show-bar',
            showComments: {
                ...this.state.showComments,
                 [id]: true
            }
        })
    }

    // get the data
    componentDidMount(){
        
        try{
            // fetch posts
            fetch(`${Config.API_ENDPOINT}/posts/`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`,
                }
            })
                .then(res => (res.ok ? res : Promise.reject(res)))
                .then(res => res.json())
                .then(res=> {
                   
                    this.context.setPosts(res, false)
                });

        
        }catch(e){
            this.context.setError(e);
        }
    }

    // converts the date to the local date
    fixDate = date =>{
        let newDate = new Date(date);
        return newDate.toLocaleDateString('en-US');
    }


    testRenderPost = ()=>{
        
        return (
            <>
                {this.context.posts.map((post, index) => (
                    <div id={post.id} key={index} className="post">
                        <div className="post-meta">
                            <p className="user-link">
                                <Link to={`/account/${post.user_id}`}>
                                {post.full_name}
                            </Link></p>
                            <p>{this.fixDate(post.date_created)}</p>
                        </div>
                        <p className="post-text">{post.post}</p>
                        <div className="stats">
                            <span>
                            <FontAwesomeIcon icon={faThumbsUp} />
                                {post.sum}
                               </span>
                            <span>Comments</span>
                        </div>
                        <div className={`rating ${this.state.addBar}`}>

                            <FontAwesomeIcon 
                                className={`rating-btn `} 
                                icon={faThumbsUp} value='1' 
                                onClick={e => this.upVote('up', post.id)} 
                            />
                            <FontAwesomeIcon 
                                className={`rating-btn `} 
                                icon={faThumbsDown} value='-1' 
                                onClick={e => this.upVote('down', post.id)} 
                            />
                            <p className="rating-btn" 
                            onClick={e => this.commentsClicked(post.id)}>
                                <FontAwesomeIcon icon={faArrowDown}/> Comment 
                                </p>

                        </div>
                        {/* for showing comments */}
                        {this.state.showComments[post.id]
                            ? <Comments postId={post.id} />
                            : null
                        }
 
                    </div>
                ))}
            </>
        );
    }

   

    

    render(){
       
        return(
            <div className="post-container">
                {/* render error */}
                {this.context.error
                ? <Error err={this.context.error}/>
                : null}

                {/* render the posts */}
                {!this.context.isLoading
                ? this.testRenderPost()
                : <h1>Loading..</h1>}
               
            </div>
        );
    }
}

export default Posts;