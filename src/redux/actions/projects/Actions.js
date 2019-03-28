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
    const recieveProject = project_with_team => { 
      dispatch ({ type: GET_PROJECT_SUCCESS, payload: project_with_team}); 
      return project_with_team; 
  }

    try {
      dispatch({ type: GET_PROJECT_REQUEST })
      const res = await fetch(`http://127.0.0.1:8000/api/projects/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const project_with_team = await res.json();
      return recieveProject(project_with_team);

    } catch (error) { dispatch ({ type: GET_PROJECT_FAILURE, message: 'Could not fetch project' }); return error;  }
  }
};





export const getProjectsByUser = id => {
    return async dispatch => {  
      const recieveProjectsByUser = projects => { 
        dispatch ({ type: GET_PROJECTS_BY_USER_SUCCESS, payload: projects}); 
        return projects; 
      }
    
      try {
        dispatch({ type: GET_PROJECTS_BY_USER_REQUEST })
        const res = await fetch(`http://127.0.0.1:8000/api/projects/user/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const projects = await res.json();
        return recieveProjectsByUser(projects);
  
      } catch (error) { dispatch ({ type: GET_PROJECTS_BY_USER_FAILURE, message: 'Could not fetch projects' }); return error; }
    }
};




export const getAllProjects = () => {
    return async dispatch => {  
      const recieveAllProjects = projects => { 
        dispatch ({ type: GET_ALL_PROJECTS_USER_SUCCESS, payload: projects}); 
        return projects; 
      }
    
      try {
        dispatch({ type: GET_ALL_PROJECTS_USER_REQUEST })
        const res = await fetch(`http://127.0.0.1:8000/api/projects/user/all`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const projects = await res.json();
        return recieveAllProjects(projects);
  
      } catch (error) { dispatch ({ type: GET_ALL_PROJECTS_USER_FAILURE, message: 'Could not fetch projects' }); return error; }
    }
};  





export const projectCreate = project => {
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

    } catch (error) { dispatch ({ type: UPDATE_PROJECT_FAILURE, message: 'Could not update projects' }); return error;  }
  }
}; 




export const deleteProject = id => {
  return async dispatch => {  
    const deleteProjectSuccess = success => { 
      dispatch ({ type: DELETE_PROJECT_SUCCESS, payload: success}); return success; 
  }

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

    } catch (error) { dispatch ({ type: DELETE_PROJECT_FAILURE, message: 'Could not delete project' }); return error; }
  }
}; 
 



export const getActivity = () => {
  return async dispatch => {
    const recieveActivity = activity => { 
      dispatch ({ type: GET_ACTIVITY_SUCCESS, payload: activity}); 
      return activity; 
  }

    try {
      dispatch({ type: GET_ACTIVITY_REQUEST });
      const res = await fetch(`http://127.0.0.1:8000/api/activity/user`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const activity = await res.json();
      return recieveActivity(activity);

    } catch (error) {dispatch ({ type: GET_ACTIVITY_FAILURE, message: 'Could not fetch activity' }); return error; }
  }
}; 