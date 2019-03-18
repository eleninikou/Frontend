import {
    GET_PROJECTS_BY_USER_REQUEST,
    GET_PROJECTS_BY_USER_SUCCESS,
    GET_PROJECTS_BY_USER_FAILURE,
} from './Action-types';

export const getProjectsByUser = (token, id) => {

    return async dispatch => {
      const getProjectsByUserRequest = () => { dispatch({ type: GET_PROJECTS_BY_USER_REQUEST }) };
  
      const recieveProjectsByUser = projects => { 
        debugger;  
        dispatch ({ type: GET_PROJECTS_BY_USER_SUCCESS, payload: projects}); 
        return projects; 
    }
  
      const getProjectsByUserError = error => { dispatch ({ type: GET_PROJECTS_BY_USER_FAILURE, message: 'Could not fetch projects' }); return error; }
  
      try {
        getProjectsByUserRequest();
        debugger;
        const res = await fetch(`http://127.0.0.1:8000/api/projects/user/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json"}
        })
        const projects = await res.json();
        return recieveProjectsByUser(projects);
  
      } catch (error) { return getProjectsByUserError(error) }
    }
  };