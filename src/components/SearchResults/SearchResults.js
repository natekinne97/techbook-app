import React from 'react';
import PostContext from '../../Context/Context';
import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './SearchResults.css';

class SearchResults extends React.Component{
    static contextType = PostContext;


    hideResults = ()=>{
        console.log('hiding search results');
        this.context.clearSearch();
    }


    renderGroups(){
        // only displays if there is content
        if(this.context.groups.length > 0){
            return (
                <div className="groups-container">
                    {this.context.groups.map(group => (
                        <Link key={group.id + 33} to={`/group/${group.id}`} >
                            {group.name}
                        </Link>
                    ))}

                </div>
            )
        }
        
    }

    
    renderPeople(){
        // only return if there is content
        if(this.context.people.length > 0){
            console.log('rendering people')
            return (
                <div className="people-container">
                    {this.context.people.map((person, index) => (
                        <Link key={person.id + index} to={`/account/${person.id}`} className="person">
                            {person.name}
                        </Link>
                    ))}
                </div>
            );
        }
    }

    render(){
        return(
            <div className="search-results">
                <div className="result-bar">
                    <h1>Search Results</h1>
                    <FontAwesomeIcon id="x" icon={faTimesCircle} onClick={this.hideResults}/>
                </div>
               
                {this.renderGroups()}
                {this.renderPeople()}
            </div>
        );
    }
}

export default SearchResults;