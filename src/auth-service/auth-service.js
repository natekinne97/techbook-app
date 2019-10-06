import config from '../config';
import TokenService from '../services/token-services';
import IdleService from '../services/idle-services';



const authApi = {
    // login
    postLogin(credentials) {
        // login endpoint
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(res =>

                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            ).then(res => {
                /*
          whenever a logint is performed:
          1. save the token in local storage
          2. queue auto logout when the user goes idle
          3. queue a call to the refresh endpoint based on the JWT's exp value
        */
                TokenService.saveAuthToken(res.authToken)
                IdleService.regiserIdleTimerResets()
                TokenService.queueCallbackBeforeExpiry(() => {
                    authApi.postRefreshToken()
                })
                return res
            })
    },
    // user is auto logged in after creation
    // create account
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users/new-user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            ).then(res => {
                /*
          whenever a logint is performed:
          1. save the token in local storage
          2. queue auto logout when the user goes idle
          3. queue a call to the refresh endpoint based on the JWT's exp value
        */
                TokenService.saveAuthToken(res.authToken)
                IdleService.regiserIdleTimerResets()
                TokenService.queueCallbackBeforeExpiry(() => {
                    authApi.postRefreshToken()
                })
                return res
            })
    },
    // checks for user associated with token given 
    // user has 1 chance to open the link or it expires
    // called when rendered in reset.js
    getUsername(token) {
        return fetch(`${config.API_ENDPOINT}/reset/reset-check`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ resetPasswordToken: token })
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    // final step is to reset the password.
    updatePassword(username, newPassword) {
        return fetch(`${config.API_ENDPOINT}/reset/reset-password`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: newPassword
            })
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },


    postRefreshToken() {
        return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(res => {
                /*
                  similar logic to whenever a user logs in, the only differences are:
                  - we don't need to queue the idle timers again as the user is already logged in.
                  - we'll catch the error here as this refresh is happening behind the scenes
                */
                TokenService.saveAuthToken(res.authToken)
                TokenService.queueCallbackBeforeExpiry(() => {
                    authApi.postRefreshToken()
                })
                return res
            })
            .catch(err => {
                console.log('refresh token request error')
                console.error(err)
            })
    },
}

export default authApi;