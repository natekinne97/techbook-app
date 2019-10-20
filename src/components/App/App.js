import React from 'react';
import { Route, Switch } from 'react-router-dom';


// Components
import LoginPage from '../../routes/LoginPage'
import CreatePage from '../../routes/CreatePage';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Reset from '../Reset/Reset';

import Menu from '../Menu/Menu';
import PostFeed from '../PostFeed/PostFeed';
import Homepage from '../Homepage/Homepage';
import Account from '../Account/Account';
// import Signup from '../Signup/Signup';
import CreateGroup from '../CreateGroup/CreateGroup';
import EditProfile from '../EditProfile/EditProfile';

// private route
import PrivateRoute from '../../routes/private';

// idle and refresh
import TokenService from '../../services/token-services'
import authApi from '../../auth-service/auth-service'
import IdleService from '../../services/idle-services';

class App extends React.Component {
  
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }
  componentDidMount() {
    try {
      /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
      IdleService.setIdleCallback(this.logoutFromIdle)

      /* if a user is logged in */
      if (TokenService.hasAuthToken()) {
        /*
          tell the idle service to register event listeners
          the event listeners are fired when a user does something, e.g. move their mouse
          if the user doesn't trigger one of these event listeners,
            the idleCallback (logout) will be invoked
        */
        IdleService.regiserIdleTimerResets()

        /*
          Tell the token service to read the JWT, looking at the exp value
          and queue a timeout just before the token expires
        */
        TokenService.queueCallbackBeforeExpiry(() => {
          /* the timoue will call this callback just before the token expires */
          authApi.postRefreshToken()
        })
      }
    } catch (error) {
      console.log(error, 'error occured');
    }
  }

  componentWillUnmount() {
    try {
      /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
      */
      IdleService.unRegisterIdleResets()
      /*
        and remove the refresh endpoint request
      */
      TokenService.clearCallbackBeforeExpiry()
    } catch (error) {
      console.log(error, 'error logging out')
    }

  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken()
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry()
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets()
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate()
  }


  render() {
    localStorage.lastUrl = window.location.pathname;
    return (
      <div>
        <nav>
         {/* menu goes here */}
         <Menu/>
        </nav>
        <main>
          <Switch>
            {/* homepage */}
            {/* 
            landing page 
            and login
          */}
            <Route
              exact
              path="/"
              component={Homepage}
            />

            {/* <Route
              path="/signup"
              component={Signup}
            /> */}

            {/* logged in home page */}
            <PrivateRoute
              path="/home"
              component={PostFeed}
            />

            {/* account info and edit */}
            <PrivateRoute
              path="/account"
              component={Account}
            />

            {/* create a new group */}
            <PrivateRoute
              path="/make-group"
              component={CreateGroup}
            />
           
            {/* login route */}
            <Route
              path="/login"
              component={LoginPage}
            />
            {/* signup */}
            <Route
              path="/signup"
              component={CreatePage}
            />

            <Route 
              path="/edit-profile"
              component={EditProfile}
            />

            {/* forgot password */}
            <Route
              path='/forgot-password'
              component={ForgotPassword}
            />
            {/* reset password */}
            <Route
              path='/reset/:token'
              component={Reset}
            />
          </Switch>
          
        </main>
      </div>
    );
  }
}

export default App;
