import React from 'react';

// remove on non static version
import STORE from '../../STORE';

import Config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons'

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

    state={
        votes: 0,
        posts: [],
        // displays comments only for the single post
        showComments:{

        }
    }


    // fake data to show the static users the basics
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
    // get the data
    componentDidMount(){
        try{
            // fetch
            fetch(`${Config.API_ENDPOINT}/posts/`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`,
                }
            })
                .then(res => (res.ok ? res : Promise.reject(res)))
                .then(res => res.json())
                .then(res=> this.context.setPosts(res, false));

        
        }catch(e){
            this.context.setError(e);
        }
    }

    


    testRenderPost = ()=>{
        console.log(this.context.isLoading);
        return (
            <>
                {this.context.posts.map(post => (
                    <div id={post.id} key={post.id} className="post">
                        <div className="post-meta">
                            <p>{post.user}</p>
                            <p>{post.date_created}</p>
                        </div>
                        <p className="post-text">{post.post}</p>
                        <div className="rating">

                            <FontAwesomeIcon icon={faThumbsUp} value='1' onClick={e => this.upVote('up')} />
                            <FontAwesomeIcon icon={faThumbsDown} value='-1' onClick={e => this.upVote('down')} />
                            <p onClick={e => this.commentsClicked(post.id)}>Comments</p>

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