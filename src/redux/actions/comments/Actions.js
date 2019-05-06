import {
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAILURE,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
  } from '../comments/Action-Types.js';

  import Cookies from 'universal-cookie';
  const cookies = new Cookies()
  var token = cookies.get('token')

  
  export const commentCreate = (comment, token) => {
    return async dispatch => {  
      const commentSuccess = success => { 
        dispatch ({ type: CREATE_COMMENT_SUCCESS, payload: success}); return comment; 
      }

      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/comments`, {
          method: "POST",
          body: JSON.stringify(comment),
          headers: {
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const success = await res.json();
        return commentSuccess(success);
  
      } catch (error) { dispatch ({ type: CREATE_COMMENT_FAILURE, message: 'Could not create comment' }); return error; }
    }
}


export const commentDelete = id=> {
  return async dispatch => {  
    const deleteSuccess = success => { 
      dispatch ({ type: DELETE_COMMENT_SUCCESS, payload: success}); return success; }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const success = await res.json();
      return deleteSuccess(success);

    } catch (error) { dispatch ({ type: DELETE_COMMENT_FAILURE, message: 'Could not delete milestone' }); return error; }
  }
}