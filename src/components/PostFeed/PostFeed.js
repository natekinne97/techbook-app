import React from 'react'
import Posts from '../Posts/Posts';
// components
import CreatePost from '../CreatePost/CreatePost';


// this class houses the post feed as well as the container for
// the make post form.
// this class will also process the type of feed being displayed.
// such as the certain group or all feeds.
// this will be taken in as in context
class PostFeed extends React.Component{

    render(){
        return(
            <React.Fragment>
                {/* 
                    Create post will take parameters 
                    to tell the server where the post is going. i.e the
                    id of the group or user. 
                */}
                <CreatePost />
                <Posts/>
            </React.Fragment>
        );
    }
}

export default PostFeed;