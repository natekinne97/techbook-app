import React from 'react';
import {Link, Route} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import TokenService from '../../services/token-services';
import IdleService from '../../services/idle-services';
import Group from '../Group/Group';
import Search from '../Search/Search';
import PostContext from '../../Context/Context';
import './Menu.css';

// the menu. certian part will be displayed when logged in and when not
// this class also will handle searches made in the search bar
class Menu extends React.Component{
    static contextType = PostContext;

    state = {
        // hiding the burger menu   
        burger: 'hidden',
        // group is for the sidebar
        group: 'hidden'
    }

    // handles logout
    handleLogoutClick = () => {
        this.context.clearState();
        TokenService.clearAuthToken();
        /* when logging out, clear the callbacks to the refresh api and idle auto logout */
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
    }

    // show and hide burger menu
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


    // render burger menu.
    // makes it easier to hide and show menu pieces based on login 
    renderBurgerMenu = ()=>{

        return (
          <ul className={`mobile-menu-items ${this.state.burger}`}>
            <li className="hidden-desktop">
              <Link to="/home" onClick={this.burgerClicked}>
                Home
              </Link>
            </li>
            <li id="groups-head" className="hidden-desktop" onClick={this.groupClicked}>
              Groups
            </li>
            <Group show={`hidden-desktop ${this.state.group}`} />
            <li className="hidden-desktop" onClick={this.burgerClicked}>
              <Link to="/make-group">Create a group</Link>
            </li>
            <li onClick={this.burgerClicked}>
              <Link to="/account">Account</Link>
            </li>
            <li onClick={this.handleLogoutClick}>
              <Link to="/">Logout</Link>
            </li>
          </ul>
        );
    }

    // renders sidebar for desktops
    renderSideBar = ()=>{
        return (
          <ul key="sidebar" className={`desktop-menu-items hidden-mobile`}>
            <Group show="" />

            <li>
              <Link to="/make-group">Create a group</Link>
            </li>
          </ul>
        );
    }

    renderSearchBar(){
      return(
        <>
          {['/home'].map((path, index)=>(
            <Route
              key={index**4}
              path={path}
              component={Search}
            />
          ))}
        </>
      );
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
                    {this.renderSearchBar()}
                    {/* burger menu */}
                    <FontAwesomeIcon className="burger-menu" icon={faBars} onClick={this.burgerClicked}/>

                </div>
                
                {/* allow mobile menu to display when logged in */}
                {TokenService.hasAuthToken()
                ? this.renderBurgerMenu()
                : null
                }

                {/* render side bar */}
                {TokenService.hasAuthToken()
                ? this.renderSideBar()
                : null  
                }                

  

            </div>
        );
    }
}

export default Menu;