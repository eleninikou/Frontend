import {
    GET_PROJECTS_BY_USER_REQUEST,
    GET_PROJECTS_BY_USER_SUCCESS,
    GET_PROJECTS_BY_USER_FAILURE,
    GET_ALL_PROJECTS_USER_REQUEST,
    GET_ALL_PROJECTS_USER_SUCCESS,
    GET_ALL_PROJECTS_USER_FAILURE,
} from './Action-types';

export const getProjectsByUser = (token, id) => {
    return async dispatch => {
      const getProjectsByUserRequest = () => { dispatch({ type: GET_PROJECTS_BY_USER_REQUEST }) };
  
      const recieveProjectsByUser = projects => { 
        dispatch ({ type: GET_PROJECTS_BY_USER_SUCCESS, payload: projects}); 
        return projects; 
    }
  
      const getProjectsByUserError = error => { dispatch ({ type: GET_PROJECTS_BY_USER_FAILURE, message: 'Could not fetch projects' }); return error; }
  
      try {
        getProjectsByUserRequest();
        const res = await fetch(`http://127.0.0.1:8000/api/projects/user/${id}`, {
          method: "GET",
          headers: {
            'Authorization': token,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const projects = await res.json();
        return recieveProjectsByUser(projects);
  
      } catch (error) { return getProjectsByUserError(error) }
    }
  };


  export const getAllProjects = (token, id) => {
    return async dispatch => {
      const getAllProjectsRequest = () => { dispatch({ type: GET_ALL_PROJECTS_USER_REQUEST }) };
  
      const recieveAllProjects = projects => { 
        dispatch ({ type: GET_ALL_PROJECTS_USER_SUCCESS, payload: projects}); 
        return projects; 
    }
  
      const getAllProjectsError = error => { dispatch ({ type: GET_ALL_PROJECTS_USER_FAILURE, message: 'Could not fetch projects' }); return error; }
  
      try {
        getAllProjectsRequest();
        const res = await fetch(`http://127.0.0.1:8000/api/projects/user/${id}/all`, {
          method: "GET",
          headers: {
            'Authorization': token,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const projects = await res.json();
        return recieveAllProjects(projects);
  
      } catch (error) { return getAllProjectsError(error) }
    }
  };  