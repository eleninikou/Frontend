import {
    CREATE_MILESTONE_SUCCESS,
    CREATE_MILESTONE_FAILURE,
    EDIT_MILESTONE_SUCCESS,
    EDIT_MILESTONE_FAILURE,
    DELETE_MILESTONE_SUCCESS,
    DELETE_MILESTONE_FAILURE,
    GET_MILESTONE_REQUEST,
    GET_MILESTONE_SUCCESS,
    GET_MILESTONE_FAILURE,
  } from './Action-Types';

import Cookies from 'universal-cookie';
const cookies = new Cookies()
var token = cookies.get('token')


export const getMilestone = id => {
  return async dispatch => {
    const recieveMilestone = milestone_with_tickets => { 
      dispatch ({ type: GET_MILESTONE_SUCCESS, payload: milestone_with_tickets}); 
      return milestone_with_tickets; 
    }

    try {
      dispatch({ type: GET_MILESTONE_REQUEST })
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/milestones/${id}`,  {
        method: "GET",
        headers: { 
          "Authorization": `Bearer ${token}`, 
          'Access-Control-Allow-Origin': '*', 
          "Content-Type": "application/json"}
      })
      const milestone_with_tickets = await res.json();
      return recieveMilestone(milestone_with_tickets);

    } catch (error) { dispatch ({ type: GET_MILESTONE_FAILURE, message: 'Could not fetch milestone' }); return error; }
  }
};




export const milestoneCreate = (milestone, token) => {
    return async dispatch => {  
      const createMilestoneSuccess = success => { 
        dispatch ({ type: CREATE_MILESTONE_SUCCESS, payload: success}); return milestone; 
      }

      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/milestones`, {
          method: "POST",
          body: JSON.stringify(milestone),
          headers: {
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const success = await res.json();
        return createMilestoneSuccess(success);
  
      } catch (error) { dispatch ({ type: CREATE_MILESTONE_FAILURE, message: 'Could not create milestone' }); return error; }
    }
}





export const milestoneEdit = (milestone, id) => {
  return async dispatch => {
    const editedMilestone = edited_milestone => { 
      dispatch ({ type: EDIT_MILESTONE_SUCCESS, payload: edited_milestone}); 
      return edited_milestone; 
  }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/milestones/${id}`,  {
        method: "PUT",
        body: JSON.stringify(milestone),
        headers: { 
          "Authorization": `Bearer ${token}`, 
          'Access-Control-Allow-Origin': '*', 
          "Content-Type": "application/json"}
      })
      const edited_milestone = await res.json();
      return editedMilestone(edited_milestone);

    } catch (error) { dispatch ({ type: EDIT_MILESTONE_FAILURE, message: 'Could not update milestone' }); return error; }
  }
};





export const deleteMilestone = id => {
  return async dispatch => {  
    const deleteMilestoneSuccess = success_message => { 
    dispatch ({ type: DELETE_MILESTONE_SUCCESS, payload: success_message.message }); return success_message; 
  }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/milestones/${id}`, {
        method: "DELETE",
        body: JSON.stringify(id),
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const success_message = await res.json();
      return deleteMilestoneSuccess(success_message);

    } catch (error) { dispatch ({ type: DELETE_MILESTONE_FAILURE, message: 'Could not delete milestone' }); return error; }
  }
}