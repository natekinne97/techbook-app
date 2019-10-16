import React from 'react';
import STORE from '../../STORE';

import CreateComment from '../CreateComment/CreateComment';

import './Comments.css'


// comments component is in charge of retrueving the comment data from the
// server. it will get all the comments only when the comments button is clicked
// and only for the clicked on posts
// the comments will be updated for this post in the context
class Comments extends React.Component{

    getComments = ()=>{
        let post = STORE.find(post=>{
            return post.id === this.props.postId;
        });
        console.log(post);
        let comments = post.comments.map(comments=>{
            return(
                <div key={comments.id} className="comment">
                    <p>{comments.user}</p>
                    <p>{comments.text}</p>
                </div>
            );
        })

        return comments;
    }

    render(){
       
        return(
            <div className="comments-container">
                <button>Load more comments...</button>
               {this.getComments()}

                <CreateComment postId={this.props.postId}/>
            </div>
        );
    }
}

export default Comments;