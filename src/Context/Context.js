import React from 'react'

const PostContext = React.createContext({
    // data
    posts: [],
    comments: [],
    isLoading: true,
    error: null,
    searching: null,
    groups: [],
    people: [],

    // set data
    setPosts: ()=>{},
    setComments: ()=>{},
    setPeople: ()=>{},
    setGroups: ()=>{},

    // add data
    addComment: ()=>{},
    addPost: ()=>{},

    // handle the display of the search results
    setSearch: ()=>{},
    clearSearch: ()=>{},

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
        searching: null,
        groups: [],
        people: [],
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
    // set groups to be displayed as a search result
    setGroups = group =>{
        this.setState({
            groups: group
        })
    }

    // set people 
    setPeople = people =>{
        this.setState({
            people: people
        })
    }


    // set search hiding the about bar when a search is made
    setSearch = ()=>{
        this.setState({
            searching: true
        })
    }

    clearSearch = ()=>{
        this.setState({
            searching: null
        })
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
            search: this.state.searching,
            people: this.state.people,
            groups: this.state.groups,
            // set data
            setPosts: this.setPosts,
            setComments: this.setComments,

            // add the data. from added posts/comments
            addPost: this.addPost,
            addComment: this.addComments,
            setPeople: this.setPeople,
            setGroups: this.setGroups,

            // search handling
            setSearch: this.setSearch,

            // error handling
            setError: this.setError,

            // clear error
            clearError: this.clearError,
            clearSearch: this.clearSearch

        }
        return(
            <PostContext.Provider value={value}>
                {this.props.children}
            </PostContext.Provider>
        );
    }


}