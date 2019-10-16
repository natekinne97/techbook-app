import React from 'react';

// Group is going to used in the menu to get a list of all
// groups the user is currently active in. 
// then displays as a drop down from the menu
class Group extends React.Component{


    render(){
        return(
            <ul className={this.props.show}>
                <li>JavaScript</li>
                <li>Java</li>
                <li>Python</li>
            </ul>
        );
    }
}
export default Group;