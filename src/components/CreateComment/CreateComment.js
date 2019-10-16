import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

// this class will handle all of the comment additions
// we will be recieving the post id in context and sending that to the
// server
class CreateComment extends React.Component{

    render(){
        return(
            <form className="comment-form">
                <input type="text" name="comment"/>
                <button>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </button>
            </form>
        );
    }
}

export default CreateComment;