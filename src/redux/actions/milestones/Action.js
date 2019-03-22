import {
    CREATE_MILESTONE_SUCCESS,
    CREATE_MILESTONE_FAILURE,
  } from '../milestones/Action-Types';
  
export const milestoneCreate = (token, milestone) => {
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
        return createMilestoneSuccess(success);
  
      } catch (error) { return createMilestoneError(error) }
    }
  };