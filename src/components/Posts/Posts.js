import React from 'react';

// remove on non static version
import STORE from '../../STORE';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons'

import Comments from '../Comments/Comments';

import './Posts.css';

class Posts extends React.Component{
    // we are going to track the click of the votes on the server side
    // We are going to track submits by using the onClick
    // the server will send us a new number and that number with post id and 
    // upvote.
    // the server will also send back an updated comment number.

    state={
        votes: 0,
        // displays comments only for the single post
        showComments:{

        }
    }

    // fale data to show the static users the basics
    upVote = position =>{
        if(position === 'up'){
            this.setState({
                votes: this.state.votes+1
            })

        }else if(position === 'down'){
            this.setState({
                votes: this.state.votes-1
            })
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
        console.log(id)
        this.setState({
            showComments: {
                ...this.state.showComments,
                 [id]: true
            }
        })
    }


    // map out the store and put the data into a post div
    renderPosts(){
       let posts = STORE.map(post=> <div id={post.id} key={post.id} className="post">
          
            <div className="post-meta">
                <p>{post.user}</p>
                <p>{post.date_created}</p>
            </div>
            <p className="post-text">{post.text}</p>
            <div className="stats">
                <span> 
                    <FontAwesomeIcon icon={faThumbsUp}/> 
                  {this.state.votes}</span>
                <span>{post.num_comments} Comments</span>
            </div>
            <div className="rating">
               
                <FontAwesomeIcon icon={faThumbsUp} value='1' onClick={e=>this.upVote('up')} />
               <FontAwesomeIcon icon={faThumbsDown} value='-1' onClick={e=>this.upVote('down')} />
                <p onClick={e => this.commentsClicked(post.id)}>Comments</p>

            </div>

           {this.state.showComments[post.id]
               ? <Comments postId={post.id} />
                : null
           }
           
           
       </div>)

       return posts;
    }

    render(){
       
        return(
            <div className="post-container">
                {this.renderPosts()}
            </div>
        );
    }
}

export default Posts;