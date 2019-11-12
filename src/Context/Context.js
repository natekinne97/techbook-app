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
    user: null,

    // set data
    setPosts: ()=>{},
    setComments: ()=>{},
    setPeople: ()=>{},
    setGroups: ()=>{},
    setUser: ()=>{},
    clearUser: ()=>{},

    // add data
    addComment: ()=>{},
    addPost: ()=>{},
    clearState: ()=>{},

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
        user: [],
    }

    // set initial posts from server
    setPosts =  (posts, isLoading)=>{
       
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

    setUser = usr => {
        this.setState({
            user: usr
        })
    }

    clearUser = ()=>{
        this.setState({
            user: []
        })
    }

    clearSearch = ()=>{
        this.setState({
            searching: null
        })
    }

    clearState = ()=>{
        this.setState({
            posts: [],
            comments: [],
            isLoading: true,
            searching: null,
            groups: [],
            people: [],
            error: null,
            user: [],
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
            setUser: this.setUser,
            clearUser: this.clearError,

            // error handling
            setError: this.setError,
            clearState: this.clearState,
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