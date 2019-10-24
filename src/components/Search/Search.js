import React from 'react';

import PostContext from '../../Context/Context';
import TokenService from '../../services/token-services';
import Config from '../../config';

class Search extends React.Component{
    static contextType = PostContext;

    search = async searchTerm =>{
        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(searchTerm)
        }

        try {
            const fetchResponse = await fetch(`${Config.API_ENDPOINT}/search/`, settings);
            const data = await fetchResponse.json();

            if (data.posts) {
                console.log('post data');
                this.context.setPosts(data.posts);
            }

        } catch (e) {
            console.log(e)
        }
    }

    handleSubmit = async e =>{
        e.preventDefault();
        // get the search results
        const {term} = e.target;
        const searchTerm = {
            term: term.value
        }

        this.search(searchTerm);

    }

    renderResults = ()=>{

    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input className="input-field" type="text" name="term" placeholder="search" />
                    <button type="submit">Search</button>
                </form>

                
            </div>
        );
    }
}

export default Search;