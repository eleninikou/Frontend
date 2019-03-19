import Cookies from "universal-cookie";

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    GOOGLE_AUTH_REQUEST,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAILURE,
} from './Action-types';

export const login = creds => {

    return async dispatch => {
      const loginRequest = () => { dispatch({ type: LOGIN_REQUEST }) };
  
      const recieveLogin = token => { 
        dispatch ({ type: LOGIN_SUCCESS, payload: token.user}); 
        const cookies = new Cookies();
        cookies.set(
          "token", token.token, { path: "/", maxAge: 86399 },
          "user", token.user, { path: "/", maxAge: 86399 },
          );
          debugger;  
        return token.user; 
    }
  
    // return user
      const loginError = error => { dispatch ({ type: LOGIN_FAILURE, message: 'Could not login user' }); return error; }
  
      try {
        loginRequest();
        debugger;
        const res = await fetch(`http://127.0.0.1:8000/api/login`, {
          method: "POST",
          body: JSON.stringify(creds),
          headers: { "Content-Type": "application/json"}
        })
        const token = await res.json();
        return recieveLogin(token);
  
      } catch (error) { return loginError(error) }
    }
  };


  export const googleLogin = (googleAuth) => {

    return async dispatch => {
      
      const googleAuthRequest = () => { dispatch({ type: GOOGLE_AUTH_REQUEST }) };
      const googleAuthError = error => { dispatch ({ type: GOOGLE_AUTH_FAILURE, message: 'Could not authenticate user' }); return error; }
  
      const recieveGoogleAuth = user => { 
        dispatch ({ type: GOOGLE_AUTH_SUCCESS, payload: user}); 
        debugger;
        const cookies = new Cookies();
        cookies.set(
          "token", user.success.token, { path: "/", maxAge: 86399 },
          'user', user.success.user
          );
        return user;
    }

      try {
        googleAuthRequest();
        const res = await fetch(`http://127.0.0.1:8000/api/google`, {
            method: "POST",
            body: JSON.stringify(googleAuth),
            headers: { "Content-Type": "application/json" }
        })
        const user = await res.json();
        return recieveGoogleAuth(user);

      } catch (error) { return googleAuthError(error) }
    }
  };  