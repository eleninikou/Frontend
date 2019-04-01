import {
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAILURE,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAILURE,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE,
  } from '../comments/Action-Types.js';

  import Cookies from 'universal-cookie';
  const cookies = new Cookies()
  var token = cookies.get('token')

  
  export const commentCreate = comment => {
    return async dispatch => {  
      const commentSuccess = success => { 
        dispatch ({ type: CREATE_COMMENT_SUCCESS, payload: success}); return comment; 
      }

      try {
        const res = await fetch(`http://127.0.0.1:8000/api/comments`, {
          method: "POST",
          body: JSON.stringify(comment),
          headers: {
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const success = await res.json();
        return commentSuccess(success);
  
      } catch (error) { dispatch ({ type: CREATE_COMMENT_FAILURE, message: 'Could not create milestone' }); return error; }
    }
}