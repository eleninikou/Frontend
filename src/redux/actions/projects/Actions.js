import {
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAILURE,
  GET_PROJECTS_BY_USER_REQUEST,
  GET_PROJECTS_BY_USER_SUCCESS,
  GET_PROJECTS_BY_USER_FAILURE,
  GET_ALL_PROJECTS_USER_REQUEST,
  GET_ALL_PROJECTS_USER_SUCCESS,
  GET_ALL_PROJECTS_USER_FAILURE,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_SUCCESS,
  GET_ACTIVITY_FAILURE,
} from './Action-types';

import Cookies from 'universal-cookie';
const cookies = new Cookies()
var token = cookies.get('token')


export const getProject = id => {
  return async dispatch => {
    const getProjectRequest = () => { dispatch({ type: GET_PROJECT_REQUEST }) };

    const recieveProject = project_with_team => { 
      dispatch ({ type: GET_PROJECT_SUCCESS, payload: project_with_team}); 
      return project_with_team; 
  }

    const getProjectError = error => { dispatch ({ type: GET_PROJECT_FAILURE, message: 'Could not fetch project' }); return error; }

    try {
      getProjectRequest();
      const res = await fetch(`http://127.0.0.1:8000/api/projects/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const project_with_team = await res.json();
      return recieveProject(project_with_team);

    } catch (error) { return getProjectError(error) }
  }
};


export const getProjectsByUser = id => {
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
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const projects = await res.json();
        return recieveProjectsByUser(projects);
  
      } catch (error) { return getProjectsByUserError(error) }
    }
};


export const getAllProjects = () => {
    return async dispatch => {
      const getAllProjectsRequest = () => { dispatch({ type: GET_ALL_PROJECTS_USER_REQUEST }) };
  
      const recieveAllProjects = projects => { 
        dispatch ({ type: GET_ALL_PROJECTS_USER_SUCCESS, payload: projects}); 
        return projects; 
    }
  
      const getAllProjectsError = error => { dispatch ({ type: GET_ALL_PROJECTS_USER_FAILURE, message: 'Could not fetch projects' }); return error; }
  
      try {
        getAllProjectsRequest();
        const res = await fetch(`http://127.0.0.1:8000/api/projects/user/all`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const projects = await res.json();
        return recieveAllProjects(projects);
  
      } catch (error) { return getAllProjectsError(error) }
    }
};  


export const projectCreate = project => {
  debugger;
    return async dispatch => {  
      const createProjectSuccess = success => { 
        dispatch ({ type: CREATE_PROJECT_SUCCESS, payload: success }); return success; 
      }
  
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/projects`, {
          method: "POST",
          body: JSON.stringify(project),
          headers: { "Authorization": `Bearer ${token}`, 'Access-Control-Allow-Origin': '*', "Content-Type": "application/json"}
        })
        const success = await res.json();
        return createProjectSuccess(success);
  
      } catch (error) { dispatch ({ type: CREATE_PROJECT_FAILURE, message: 'Could not fetch projects' }); return error }
    }
};   


export const editProject = project => {
  return async dispatch => {  

    const editProjectSuccess = success => { 
      dispatch ({ type: UPDATE_PROJECT_SUCCESS, payload: success}); return success; 
  }

    const editProjectError = error => { dispatch ({ type: UPDATE_PROJECT_FAILURE, message: 'Could not fetch projects' }); return error; }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/projects/${project.id}`, {
        method: "PUT",
        body: JSON.stringify(project),
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const success = await res.json();
      return editProjectSuccess(success);

    } catch (error) { return editProjectError(error) }
  }
}; 

export const deleteProject = id => {
  return async dispatch => {  

    const deleteProjectSuccess = success => { 
      dispatch ({ type: DELETE_PROJECT_SUCCESS, payload: success}); return success; 
  }

    const deleteProjectError = error => { dispatch ({ type: DELETE_PROJECT_FAILURE, message: 'Could not delete project' }); return error; }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const success = await res.json();
      return deleteProjectSuccess(success);

    } catch (error) { return deleteProjectError(error) }
  }
}; 
 
export const getActivity = id => {
  return async dispatch => {
    const getActivityRequest = () => { dispatch({ type: GET_ACTIVITY_REQUEST }) };

    const recieveActivity = activity => { 
      dispatch ({ type: GET_ACTIVITY_SUCCESS, payload: activity}); 
      return activity; 
  }

    const getActivityError = error => { dispatch ({ type: GET_ACTIVITY_FAILURE, message: 'Could not fetch activity' }); return error; }

    try {
      getActivityRequest();
      const res = await fetch(`http://127.0.0.1:8000/api/activity/user`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const activity = await res.json();
      return recieveActivity(activity);

    } catch (error) { return getActivityError(error) }
  }
}; 