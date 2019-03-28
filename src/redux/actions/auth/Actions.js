import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    GOOGLE_AUTH_REQUEST,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAILURE,
} from './Action-types';

import Cookies from 'universal-cookie';
const cookies = new Cookies();



export const login = creds => {
    return async dispatch => {
      const recieveLogin = token => { 
        dispatch ({ type: LOGIN_SUCCESS, payload: token.success.user}); 
        cookies.set("token", token.success.token, { path: "/", maxAge: 86399 });
        cookies.set("user", token.success.user.id, { path: "/", maxAge: 86399 });
        return token.success.user; 
      }
  
      try {
        dispatch({ type: LOGIN_REQUEST });
        const res = await fetch(`http://127.0.0.1:8000/api/login`, {
          method: "POST",
          body: JSON.stringify(creds),
          headers: { 
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'mode': 'no-cors'
          }
        })
        const token = await res.json();
        return recieveLogin(token);
  
      } catch (error) { dispatch ({ type: LOGIN_FAILURE, message: 'Could not login user' }); return error; }
    }
};



export const googleLogin = (googleAuth) => {
    return async dispatch => {  
      const recieveGoogleAuth = user => { 
        dispatch ({ type: GOOGLE_AUTH_SUCCESS, payload: user}); 
        cookies.set("token", user.success.token, { path: "/", maxAge: 86399 });
        cookies.set("user", user.success.user.id, { path: "/", maxAge: 86399 });
        return user;
      }

      try {
        dispatch({ type: GOOGLE_AUTH_REQUEST });
        const res = await fetch(`http://127.0.0.1:8000/api/google`, {
            method: "POST",
            body: JSON.stringify(googleAuth),
            headers: { "Content-Type": "application/json" }
        })
        const user = await res.json();
        return recieveGoogleAuth(user);

      } catch (error) { dispatch ({ type: GOOGLE_AUTH_FAILURE, message: 'Could not authenticate user' }); return error;}
    }
};  




  export const logout = (token) => {
    debugger;
    return async dispatch => {
      const logoutSuccess = success => { dispatch ({ type: LOGOUT_SUCCESS, payload: success}); return success; }

      try {
        const res = await fetch(`http://127.0.0.1:8000/api/logout`, {
            method: "POST",
            headers: { 
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*',
              'mode': 'no-cors'
            }
        })
        const success = await res.json();
        debugger;
        return logoutSuccess(success);

      } catch (error) { dispatch ({ type: LOGOUT_FAILURE, message: 'Could not logout user' }); return error;  }
    }
  };  