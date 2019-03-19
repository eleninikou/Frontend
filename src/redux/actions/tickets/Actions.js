import {
    GET_ALL_TICKETS_USER_REQUEST,
    GET_ALL_TICKETS_USER_SUCCESS,
    GET_ALL_TICKETS_USER_FAILURE
} from './Action-types';

export const getAllTickets = (token, id) => {
    return async dispatch => {
      const getAllTicketsRequest = () => { dispatch({ type: GET_ALL_TICKETS_USER_REQUEST }) };
  
      const recieveAllTickets = tickets => { 
        dispatch ({ type:  GET_ALL_TICKETS_USER_SUCCESS, payload: tickets}); 
        return tickets; 
    }
  
      const getAllTicketsError = error => { dispatch ({ type: GET_ALL_TICKETS_USER_FAILURE, message: 'Could not fetch tickets' }); return error; }
  
      try {
        getAllTicketsRequest();
        const res = await fetch(`http://127.0.0.1:8000/api/tickets/user/${id}/all`, {
          method: "GET",
          headers: {
            'Authorization': token,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const tickets = await res.json();
        return recieveAllTickets(tickets);
  
      } catch (error) { return getAllTicketsError(error) }
    }
  };  