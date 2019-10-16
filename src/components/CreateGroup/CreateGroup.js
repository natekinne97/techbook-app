import React from 'react';
import './CreateGroup.css';


// this component allows the user to create a new group forum topic
// one that specifically aligns with their technical niche
class CreateGroup extends React.Component{

    // here we will have a call to post 
    // '/new-group' and insert the new group into db with the user as the 
    // first enrty in the group

    render(){
        return(
            <div className="group-container">
                <h1>New group</h1>
                <form className="group-form">
                    <label htmlFor="name">Group Name:</label>
                    <input type="text" name="name"/>

                    <label htmlFor="about">About</label>
                    <textarea name="about"></textarea>

                    <label htmlFor="level">What experience level is this for?</label>
                    <input type="text" name="level"/>

                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
export default CreateGroup;