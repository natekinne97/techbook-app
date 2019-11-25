import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './CreateComment.css';

import Error from '../Error/Error';


// this class will handle all of the comment additions
// we will be recieving the post id in context and sending that to the
// server
class CreateComment extends React.Component{
    
    static defaultProps = {
        postId: '',
        addComment: ()=>{}
    }

   

    handleSubmit = e=>{
        e.preventDefault();
        const {comment} = e.target;

        const newComment = {
            post_id: this.props.postId,
            comment: comment.value
        }
        comment.value = '';
       

        this.props.insertComment(newComment);
    }

    render(){
        return(
            <form className="comment-form" onSubmit={this.handleSubmit}>
                {this.context.error
                ? <Error err={this.context.error}/>
                : null}
                <input type="text" name="comment" required/>

                <button>
                    <FontAwesomeIcon className="add-comment" icon={faArrowRight}/>
                </button>
            </form>
        );
    }
}

export default CreateComment;