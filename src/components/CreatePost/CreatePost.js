import React from 'react';
import './CreatePost.css';

import TokenService from '../../services/token-services';
import Config from '../../config';

import PostContext from '../../Context/Context';

// this component allows the user to create a new post
// it can be done inside a group or in personal. 
// we will check if the person is inside a group or not befor sending the 
// data back to the server with the group id or only the user id
// 
class CreatePost extends React.Component{
    static contextType = PostContext;
    // the insert post method
    insertPost = async newPost =>{
        
        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(newPost)
        }

        try{
            const fetchResponse = await fetch(`${Config.API_ENDPOINT}/posts`, settings);
            const data = await fetchResponse.json();
           
            this.context.addPost(data);
        }catch(e){
             this.context.setError(e);
        }
    }

    postSubmit = e =>{
        e.preventDefault();
        const {post}  = e.target;
        const newPost = {
            post: post.value
        }
        post.value = '';
        this.insertPost(newPost);
    }

    render(){
        return(
            <div className="create-post">
                <form className="make-post" onSubmit={this.postSubmit}>
                    <h3>Ask a question.</h3>
                    <textarea  name="post" required>
                    </textarea>
                    <button type="submit">Post</button>
                </form>
            </div>
        );
    }
}

export default CreatePost;