import {
    CREATE_MILESTONE_SUCCESS,
    CREATE_MILESTONE_FAILURE,
    DELETE_MILESTONE_SUCCESS,
    DELETE_MILESTONE_FAILURE,
  } from './Action-Types';

import Cookies from 'universal-cookie';
const cookies = new Cookies()
var token = cookies.get('token')


export const milestoneCreate = milestone => {
    return async dispatch => {  

      const createMilestoneSuccess = success => { 
        dispatch ({ type: CREATE_MILESTONE_SUCCESS, payload: success}); return milestone; 
    }

      const createMilestoneError = error => { dispatch ({ type: CREATE_MILESTONE_FAILURE, message: 'Could not create milestone' }); return error; }
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/milestones`, {
          method: "POST",
          body: JSON.stringify(milestone),
          headers: {
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const success = await res.json();
        debugger;
        return createMilestoneSuccess(success);
  
      } catch (error) { return createMilestoneError(error) }
    }
}

export const deleteMilestone = id => {
  debugger;
  return async dispatch => {  

    const deleteMilestoneSuccess = success_message => { 
      debugger;
      dispatch ({ type: DELETE_MILESTONE_SUCCESS, payload: success_message.message }); return success_message; 
  }

    const deleteMilestoneError = error => { dispatch ({ type: DELETE_MILESTONE_FAILURE, message: 'Could not delete milestone' }); return error; }
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/milestones/${id}`, {
        method: "DELETE",
        body: JSON.stringify(id),
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const success_message = await res.json();
      return deleteMilestoneSuccess(success_message);

    } catch (error) { return deleteMilestoneError(error) }
  }
}