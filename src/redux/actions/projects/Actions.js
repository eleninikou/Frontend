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
} from './Action-types';


export const getProject = (token, id) => {
  return async dispatch => {
    const getProjectRequest = () => { dispatch({ type: GET_PROJECT_REQUEST}) };

    const recieveProject = project => { 
      dispatch ({ type: GET_PROJECT_SUCCESS, payload: project}); 
      return project; 
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
      const project = await res.json();
      return recieveProject(project);

    } catch (error) { return getProjectError(error) }
  }
};


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
            "Authorization": `Bearer ${token}`,
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
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const projects = await res.json();
        return recieveAllProjects(projects);
  
      } catch (error) { return getAllProjectsError(error) }
    }
  };  


  export const projectCreate = (token, project) => {
    return async dispatch => {  

      const createProjectSuccess = success => { 
        dispatch ({ type: CREATE_PROJECT_SUCCESS, payload: success}); return project; 
    }

      const createProjectError = error => { dispatch ({ type: CREATE_PROJECT_FAILURE, message: 'Could not fetch projects' }); return error; }
  
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/projects`, {
          method: "POST",
          body: JSON.stringify(project),
          headers: {
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const success = await res.json();
        return createProjectSuccess(success);
  
      } catch (error) { return createProjectError(error) }
    }
  };   