import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Group from '../Group/Group';
import './Menu.css';

// the menu. certian part will be displayed when logged in and when not
// this class also will handle searches made in the search bar
class Menu extends React.Component{

    state = {
        burger: 'hidden',
        group: 'hidden'
    }

    burgerClicked = ()=>{
       
        if(this.state.burger === 'hidden'){
            this.setState({
                burger: 'show'
            });
        }else{
            
            this.setState({
                burger: 'hidden'
            });
        }
    }

    groupClicked = () => {

        if (this.state.group === 'hidden') {

            this.setState({
                group: 'show'
            });
        } else {

            this.setState({
                group: 'hidden'
            });
        }
    }



    render(){
        return(
            <div className="menu">
                <div className='top-menu'>
                    <header>
                        <Link to="/home">TB</Link>
                        {/* <Link>TechBook</Link> */}
                    </header>
                    {/* search bar */}
                    <form>
                        <input className="input-field" type="text" name="search" value="search" />
                    </form>
                    <FontAwesomeIcon icon={faBars} onClick={this.burgerClicked}/>

                </div>
                
                <ul className={`mobile-menu-items ${this.state.burger}`}>
                    <li className="hidden-desktop"><Link to='/home' onClick={this.burgerClicked}>Home</Link></li>
                    <li className="hidden-desktop" onClick={this.groupClicked}>
                        Groups 
                        <Group show={this.state.group}/>
                    </li>
                    <li className="hidden-desktop"><Link to="/make-group">Create a group</Link></li>
                    <li onClick={this.burgerClicked}><Link to="/account">Account</Link></li>
                    <li onClick={this.burgerClicked}><Link to="/">Logout</Link></li>
                </ul>

                <ul className={`desktop-menu-items hidden-mobile`}>
                    <li><Link to='/home' onClick={this.burgerClicked}>Home</Link></li>
                    
                    <li onClick={this.groupClicked}>
                        Groups
                        <Group />
                    </li>
                   
                   <li><Link to="/make-group">Create a group</Link></li>
                </ul>

            </div>
        );
    }
}

export default Menu;