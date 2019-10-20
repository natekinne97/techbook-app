import React from 'react';

import CreateComment from '../CreateComment/CreateComment';
import PostContext from '../../Context/Context';
import Error from '../Error/Error';
import TokenService from '../../services/token-services'; 
import Config from '../../config';
import './Comments.css'


// comments component is in charge of retrueving the comment data from the
// server. it will get all the comments only when the comments button is clicked
// and only for the clicked on posts
// the comments will be updated for this post in the context
class Comments extends React.Component{
    static contextType = PostContext;

    static defaultProps = {
        postId: ''
    }

    componentDidMount(){
     
        fetch(`${Config.API_ENDPOINT}/posts/comments/${this.props.postId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res => (res.ok ? res : Promise.reject(res)))
            .then(res => res.json())
            .then(res => this.context.setComments(res, false))
            .catch(err=> this.context.setError(err));

    }

    // render all comments
    renderComments = ()=>{
        console.log('rendering comments')
        return (
            <>
                {this.context.comments.map(comment => (
                    
                    <div key={comment.id} className="comment">
                        <p>{comment.user}</p>
                        <p>{comment.comment}</p>
                    </div>
                ))}
            </>
        );
    }


    render(){
       
        return(
            <div className="comments-container">
                <button>Load more comments...</button>
                {/* render error message    */}
                {this.context.Error 
                ? <Error err={this.context.error}/>
                : null}

                    
                {!this.context.isLoading
                ? this.renderComments()
                : <h1>Loading...</h1>}
                

                <CreateComment postId={this.props.postId}/>
            </div>
        );
    }
}

export default Comments;