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
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    GET_EMAIL_REQUEST,
    GET_EMAIL_SUCCESS,
    GET_EMAIL_FAILURE,
    ACCEPT_INVITATION_SUCCESS,
    ACCEPT_INVITATION_FAILURE,
} from './Action-types';

import Cookies from 'universal-cookie'
const cookies = new Cookies();
var token = cookies.get('token')


export const register = creds => {
  return async dispatch => {
    const registrationSuccess = user => { 
      debugger;
      dispatch ({ type: REGISTER_SUCCESS, payload: user.success.user}); 
      cookies.set("token", user.success.token, { path: "/", maxAge: 86399 });
      cookies.set("user", user.success.user.id, { path: "/", maxAge: 86399 });
      return user.success.user; 
    }

    try {
      dispatch({ type: REGISTER_REQUEST });
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/register`, {
        method: "POST",
        body: JSON.stringify(creds),
        headers: { 
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          'mode': 'no-cors'
        }
      })
      const user = await res.json();
      if (user.message) {
        dispatch ({ type: REGISTER_FAILURE, message: user.message })
      } else {
        return registrationSuccess(user);
      }

    } catch (error) { dispatch ({ type: REGISTER_FAILURE, message: 'Could not register user' }); return error; }
  }
};


export const login = creds => {
    return async dispatch => {

      const recieveLogin = response => { 
        dispatch ({ type: LOGIN_SUCCESS, payload: response.success.user}); 
        cookies.set("token", response.success.token, { path: "/", maxAge: 86399 });
        cookies.set("user", response.success.user.id, { path: "/", maxAge: 86399 });
        return response.success.user; 
      }
  
        dispatch({ type: LOGIN_REQUEST });
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
          method: "POST",
          body: JSON.stringify(creds),
          headers: { 
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'mode': 'no-cors'
          }
        })
        const response = await res.json();
        if(response.success) {
          return recieveLogin(response);
        } else { 
          dispatch ({ type: LOGIN_FAILURE, message: response.message }) 
        }
  
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
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/google`, {
            method: "POST",
            body: JSON.stringify(googleAuth),
            headers: { "Content-Type": "application/json" }
        })
        const user = await res.json();
        return recieveGoogleAuth(user);

      } catch (error) { dispatch ({ type: GOOGLE_AUTH_FAILURE, message: 'Could not authenticate user' }); return error;}
    }
};  




export const logout = () => {
  return async dispatch => {
    const logoutSuccess = success => { dispatch ({ type: LOGOUT_SUCCESS, payload: success}); return success; }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/logout`, {
          method: "POST",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'mode': 'no-cors'
          }
      })
      const success = await res.json();
      return logoutSuccess(success);
    } catch (error) { dispatch ({ type: LOGOUT_FAILURE, message: 'Could not logout user' }); return error;  }
  }
};  


export const getUser = (id, token) => {
  return async dispatch => {
    const getUserSuccess = user=> { dispatch ({ type: GET_USER_SUCCESS, payload: user}); return user; }
    try {
      dispatch({ type: GET_USER_REQUEST });
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/${id}`, {
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'mode': 'no-cors'
          }
      })
      const user = await res.json();
      return getUserSuccess(user);
    } catch (error) { dispatch ({ type: GET_USER_FAILURE, message: 'Could not get user' }); return error;  }
  }
};  


export const updateUser = (user, id) => {
  return async dispatch => {  
    const editProjectSuccess = success => { 
      dispatch ({ type: UPDATE_USER_SUCCESS, payload: success}); return success; 
  }
  
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const success = await res.json();
      return editProjectSuccess(success);

    } catch (error) { dispatch ({ type: UPDATE_USER_FAILURE, message: 'Could not update user' }); return error; }
  }
}; 

export const getEmailFromInvitation = InvitationToken => {

  return async dispatch => {  
    const getEmailSuccess = success => { 
      dispatch ({ type: GET_EMAIL_SUCCESS, payload: success }); return success ; 
  }
  
    try {
      dispatch({ type: GET_EMAIL_REQUEST })
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/invitation/${InvitationToken}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const success = await res.json();
      return getEmailSuccess(success);

    } catch (error) { dispatch ({ type: GET_EMAIL_FAILURE, message: 'Could not get email' }); return error; }
  }
}; 

export const acceptInvitation = sendToken => {
  return async dispatch => {  
    const getEmailSuccess = success => { 
      dispatch ({ type: ACCEPT_INVITATION_SUCCESS, payload: success }); return success ; 
  }
  
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/accept/${sendToken}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const success = await res.json();
      return getEmailSuccess(success);

    } catch (error) { dispatch ({ type: ACCEPT_INVITATION_FAILURE, message: 'Could not get email' }); return error; }
  }
}; 
 


export const deleteUser = (id, token ) => {
  return async dispatch => {  
    const deleteUserSuccess = success => { 
      dispatch ({ type: DELETE_USER_SUCCESS, payload: success }); return success; 
  }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/account/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const success = await res.json();
      return deleteUserSuccess(success);

    } catch (error) { dispatch ({ type: DELETE_USER_FAILURE, message: 'Could not delete image' }); return error; }
  }
};