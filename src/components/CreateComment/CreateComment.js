import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import PostContext from '../../Context/Context';
import Error from '../Error/Error';
import TokenService from '../../services/token-services';
import Config from '../../config';

// this class will handle all of the comment additions
// we will be recieving the post id in context and sending that to the
// server
class CreateComment extends React.Component{
    static contextType = PostContext;

    static defaultProps = {
        postId: ''
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
            console.log(data, 'data');
            this.context.addComment(data);
        } catch (e) {
            this.context.setError(e);
        }
    }

    handleSubmit = e=>{
        e.preventDefault();
        const {comment} = e.target;

        const newComment = {
            post_id: this.props.postId,
            comment: comment.value
        }
        comment.value = '';
        console.log(newComment, 'new comment');

        this.insertComment(newComment);
    }

    render(){
        return(
            <form className="comment-form" onSubmit={this.handleSubmit}>
                {this.context.error
                ? <Error err={this.context.error}/>
                : null}
                <input type="text" name="comment" required/>

                <button>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </button>
            </form>
        );
    }
}

export default CreateComment;