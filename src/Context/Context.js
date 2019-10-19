import React from 'react'

const PostContext = React.createContext({
    // data
    posts: [],
    comments: [],
    isLoading: true,
    error: null,
    // set data
    setPosts: ()=>{},
    setComments: ()=>{},

    // add data
    addComment: ()=>{},
    addPost: ()=>{},

    // error handling
    setError: ()=>{},

    // clear errors
    clearError: ()=>{}

});

export default PostContext;

export class PostProvider extends React.Component{
    state={
        posts: [],
        comments: [],
        isLoading: true,

        error: null,
    }

    // set initial posts from server
    setPosts =  (posts, isLoading)=>{
        console.log(isLoading)
         this.setState({
            posts: posts,
            isLoading: isLoading
        })
    }

    // add posts when added and refreshed
    addPost = post => {
        this.setPosts([
            post,
            ...this.state.posts
        ])
    }

    // set comments from server
    setComments = (comments, isLoading) => {
        
        this.setState({
            comments: comments,
            isLoading: isLoading
        })
    }

    // add comments
    addComments = comment =>{
        this.setComments([
            ...this.state.comments,
            comment
        ])
    }

    setError = error=>{
        
        this.setState({
            error: error
        })
    }

    clearError = ()=>{
        this.setState({
            error: null
        })
    }

    render(){
        const value = {
            // data
            posts: this.state.posts,
            comments: this.state.comments,
            error: this.state.error,

            // set data
            setPosts: this.setPosts,
            setComments: this.setComments,

            // add the data. from added posts/comments
            addPost: this.addPost,
            addComment: this.addComments,

            // error handling
            setError: this.setError,

            // clear error
            clearError: this.clearError

        }
        return(
            <PostContext.Provider value={value}>
                {this.props.children}
            </PostContext.Provider>
        );
    }


}