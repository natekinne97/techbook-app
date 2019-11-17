import React from 'react';
import {Link} from 'react-router-dom';
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

    state = {
        comments: []
    }

    // ascync comment insert
    insertComment = async newComment => {

        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(newComment)
        }

        try {
            const fetchResponse = await fetch(`${Config.API_ENDPOINT}/comments/`, settings);
            const data = await fetchResponse.json();
           
            const tmpSate = [data, ...this.state.comments];
           
            this.setState({
                comments: tmpSate
            });
            
        } catch (e) {
            
            this.context.setError(e);
        }
    }

    componentDidMount(){
       
        // get all the comments
        fetch(`${Config.API_ENDPOINT}/comments/${this.props.postId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res => (res.ok ? res : Promise.reject(res)))
            .then(res => res.json())
            .then(res => {
                this.setState({
                  comments: res
                });
                
            })
            .catch(err=> {
                this.context.setError(err);
            });

    }

    // render all comments
    renderComments = ()=>{
        if(this.state.comments){
            return (
              <>
                {this.state.comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <p className="commenter">
                        <Link to={`/account/${comment.user_id}`}>
                            {comment.user}
                        </Link></p>
                    <p className="comment-text">{comment.comment}</p>
                  </div>
                ))}
              </>
            );
        }else{
            return (
                <><Error err="Something went wrong"/></>
            );
        }
    }


    render(){
       
        return(
            <div className="comments-container">
                
                {/* render error message    */}
                {this.context.Error 
                ? <Error err={this.context.error}/>
                : null}

                {this.renderComments()}

                
                <CreateComment insertComment={this.insertComment} postId={this.props.postId}/>
            </div>
        );
    }
}

export default Comments;