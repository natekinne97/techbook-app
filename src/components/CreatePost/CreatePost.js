import React from 'react';
import './CreatePost.css';

// this component allows the user to create a new post
// it can be done inside a group or in personal. 
// we will check if the person is inside a group or not befor sending the 
// data back to the server with the group id or only the user id
// 
class CreatePost extends React.Component{


    postSubmit = e =>{
        e.preventDefault();
    }

    render(){
        return(
            <div className="create-post">
                <form className="make-post" onSubmit={this.postSubmit}>
                    <h3>Ask a question.</h3>
                    <textarea >
                    </textarea>
                    <button type="submit">Post</button>
                </form>
            </div>
        );
    }
}

export default CreatePost;