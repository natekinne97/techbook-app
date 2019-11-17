import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import PostContext from '../../Context/Context';
import TokenService from '../../services/token-services';
import Config from '../../config';
import './Search.css';

// this is the search bar at the top of the page
// it call on the postfeed class to display the results
// and sets the posts in the context
class Search extends React.Component{
    static contextType = PostContext;


    // search with the search term
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
           
            console.log(data.error);
            if(data.error){
                this.context.setError(data.error);
            }else{
                this.context.setGroups(data.groups);
                this.context.setPeople(data.people);
                if (data.posts) {
                    this.context.setPosts(data.posts);
                }  
            }
             
            
        } catch (e) {
            console.log(e)
            this.context.setError(e);
        }
    }

    handleSubmit = async e =>{
        e.preventDefault();
        // get the search results
        const {term} = e.target;
        const searchTerm = {
            term: term.value
        }
        
        // this shows the search results container.
        this.context.setSearch();

        this.search(searchTerm);

    }


    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input className="input-field" type="text" name="term" placeholder="search" />
                    <button type="submit">
                        <FontAwesomeIcon  icon={faSearch}/>
                    </button>
                </form>

                
            </div>
        );
    }
}

export default Search;