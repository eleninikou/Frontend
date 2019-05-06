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
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAILURE,
  INVITATION_REQUEST,
  INVITATION_SUCCESS,
  INVITATION_FAILURE,
  GET_INVITATIONS_SUCCESS,
  GET_INVITATIONS_FAILURE,
  REMOVE_FROM_TEAM_SUCCESS,
  REMOVE_FROM_TEAM_FAILURE,
  CLEAR_DASHBOARD
} from './Action-types';

import Cookies from 'universal-cookie';
const cookies = new Cookies()
var token = cookies.get('token')

export const getProject = (id, token) => {
  return async dispatch => {
    const recieveProject = project_with_team => { 
      dispatch ({ type: GET_PROJECT_SUCCESS, payload: project_with_team}); 
      return project_with_team; 
  }

    try {
      dispatch({ type: GET_PROJECT_REQUEST })
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/projects/${id}`, {
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



export const getProjectsByUser = token => {
    return async dispatch => {  
      const recieveProjectsByUser = projects => { 
        dispatch ({ type: GET_PROJECTS_BY_USER_SUCCESS, payload: projects}); 
        return projects; 
      }
    
      try {
        dispatch({ type: GET_PROJECTS_BY_USER_REQUEST })
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/projects/user`, {
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




export const getAllProjects = (token) => {
    return async dispatch => {  
      const recieveAllProjects = projects => { 
        dispatch ({ type: GET_ALL_PROJECTS_USER_SUCCESS, payload: projects}); 
        return projects; 
      }
    
      try {
        dispatch({ type: GET_ALL_PROJECTS_USER_REQUEST })
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/projects/user/all`, {
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





export const projectCreate = (project, token)=> {
    return async dispatch => {  
      const createProjectSuccess = success => { 
        dispatch ({ type: CREATE_PROJECT_SUCCESS, payload: success }); return success; 
      }
  
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/projects`, {
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
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/projects/${project.id}`, {
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
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/projects/${id}`, {
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
 

export const getActivity = (token) => {
  return async dispatch => {
    const recieveActivity = activity => { 
      dispatch ({ type: GET_ACTIVITY_SUCCESS, payload: activity}); 
      return activity; 
    }
    
    try {
      dispatch({ type: GET_ACTIVITY_REQUEST });
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/activity/user`, {
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



export const getRoles = () => {
  return async dispatch => {
    const recieveProject = roles => { 
      dispatch ({ type: GET_ROLES_SUCCESS, payload: roles }); 
      return roles; 
  }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/roles`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const roles = await res.json();
      return recieveProject(roles);

    } catch (error) { dispatch ({ type: GET_ROLES_FAILURE, message: 'Could not fetch roles' }); return error;  }
  }
};


export const getTeam = id => {
  return async dispatch => {
    const recieveProject = team => { 
      dispatch ({ type: GET_TEAM_SUCCESS, payload: team }); 
      return team; 
  }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/projects/team/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const team = await res.json();
      return recieveProject(team);

    } catch (error) { dispatch ({ type: GET_TEAM_FAILURE, message: 'Could not fetch roles' }); return error;  }
  }
};

export const removeFromTeam = (id) => {
  return async dispatch => {  
    const removeSuccess = success => { 
      dispatch ({ type: REMOVE_FROM_TEAM_SUCCESS, payload: success}); return success; 
  }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/projects/team/user/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const success = await res.json();
      return removeSuccess(success);

    } catch (error) { dispatch ({ type: REMOVE_FROM_TEAM_FAILURE, message: 'Could not delete project' }); return error; }
  }
}; 


export const invite = invitation => {
  return async dispatch => {
    const inviteSuccess = success => { 
      dispatch ({ type: INVITATION_SUCCESS, payload: success }); 
      return success; 
  }
    try {
      dispatch ({ type: INVITATION_REQUEST})
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/projects/${invitation.project_id}/invite`, {
        method: "POST",
        body: JSON.stringify(invitation),
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const success = await res.json();
      return inviteSuccess(success);

    } catch (error) { dispatch ({ type: INVITATION_FAILURE, message: 'Could not fetch roles' }); return error;  }
  }
};


export const getEmails = id => {
  return async dispatch => {
    const inviteSuccess = success => { 
      dispatch ({ type: GET_INVITATIONS_SUCCESS, payload: success }); 
      return success; 
  }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/projects/${id}/invited`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const success = await res.json();
      return inviteSuccess(success);

    } catch (error) { dispatch ({ type: GET_INVITATIONS_FAILURE, message: 'Could not fetch emails' }); return error;  }
  }
};

export const clearDashboard = () => {
  return async dispatch => {
    dispatch({ type: CLEAR_DASHBOARD })
  }
}