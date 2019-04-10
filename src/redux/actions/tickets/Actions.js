import {
    GET_TICKET_REQUEST,
    GET_TICKET_SUCCESS,
    GET_TICKET_FAILURE,
    GET_TICKET_TYPES_REQUEST,
    GET_TICKET_TYPES_SUCCESS,
    GET_TICKET_TYPES_FAILURE,
    GET_TICKET_STATUS_REQUEST,
    GET_TICKET_STATUS_SUCCESS,
    GET_TICKET_STATUS_FAILURE,
    GET_ALL_TICKETS_USER_REQUEST,
    GET_ALL_TICKETS_USER_SUCCESS,
    GET_ALL_TICKETS_USER_FAILURE,
    CREATE_TICKET_SUCCESS,
    CREATE_TICKET_FAILURE,
    UPDATE_TICKET_SUCCESS,
    UPDATE_TICKET_FAILURE,
    DELETE_TICKET_SUCCESS,
    DELETE_TICKET_FAILURE,
} from './Action-types';

import Cookies from 'universal-cookie';
const cookies = new Cookies()
var token = cookies.get('token')

export const getTicket = id => {
  return async dispatch => {
    const recieveTicket = ticket => { 
      dispatch ({ type: GET_TICKET_SUCCESS, payload: ticket}); 
      return ticket; 
  }

  try {
      dispatch({ type: GET_TICKET_REQUEST })
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })

      const ticket = await res.json();
      return recieveTicket(ticket);
    } catch (error) { dispatch ({ type: GET_TICKET_FAILURE, message: 'Could not fetch ticket' }); return error; }
  }
}


export const getAllTickets = () => {
    return async dispatch => {
      const recieveAllTickets = tickets => { 
        dispatch ({ type:  GET_ALL_TICKETS_USER_SUCCESS, payload: tickets}); 
        return tickets; 
    }
        try {
        dispatch({ type: GET_ALL_TICKETS_USER_REQUEST })
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/user`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const tickets = await res.json();
        return recieveAllTickets(tickets);
  
      } catch (error) { dispatch ({ type: GET_ALL_TICKETS_USER_FAILURE, message: 'Could not fetch tickets' }); return error; }
    }
};  

  export const ticketCreate = ticket => {
    return async dispatch => {  
      const createTicketSuccess = success => { 
        dispatch ({ type: CREATE_TICKET_SUCCESS, payload: success}); return ticket; 
    }

      const createTicketError = error => { dispatch ({ type: CREATE_TICKET_FAILURE, message: 'Could not fetch projects' }); return error; }
  
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tickets`, {
          method: "POST",
          body: JSON.stringify(ticket),
          headers: {
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const success = await res.json();
        return createTicketSuccess(success);
  
      } catch (error) { return createTicketError(error) }
    }
  };    


  export const updateTicket = (ticket, id) => {
    return async dispatch => {  
      const editProjectSuccess = success => { 
        dispatch ({ type: UPDATE_TICKET_SUCCESS, payload: success}); return success; 
    }
    
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/${id}`, {
          method: "PUT",
          body: JSON.stringify(ticket),
          headers: {
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const success = await res.json();
        return editProjectSuccess(success);
  
      } catch (error) { dispatch ({ type: UPDATE_TICKET_FAILURE, message: 'Could not update ticket' }); return error; }
    }
  };   

export const getTicketTypes = () => {
    return async dispatch => {
      const getTicketTypesRequest = () => { dispatch({ type: GET_TICKET_TYPES_REQUEST}) };
  
      const recieveTicketTypes = types => { 
        dispatch ({ type:  GET_TICKET_TYPES_SUCCESS, payload: types}); 
        return types; 
    }
  
      const TicketTypesError = error => { dispatch ({ type: GET_TICKET_TYPES_FAILURE, message: 'Could not fetch ticket types' }); return error; }
      try {
        getTicketTypesRequest();
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/types`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const types = await res.json();
        return recieveTicketTypes(types);
  
      } catch (error) { return TicketTypesError(error) }
    }
};   



export const getTicketStatus = () => {
  return async dispatch => {
    const recieveTicketStatus = Status => { 
      dispatch ({ type:  GET_TICKET_STATUS_SUCCESS, payload: Status}); 
      return Status; 
  }

    try {
      dispatch({ type: GET_TICKET_STATUS_REQUEST})
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/status`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const types = await res.json();
      return recieveTicketStatus(types);

    } catch (error) {  dispatch ({ type: GET_TICKET_STATUS_FAILURE, message: 'Could not fetch ticket status' }); return error;  }
  }
};



export const deleteTicket = id => {
  return async dispatch => {  
    const deleteTicketSuccess = success => { 
      dispatch ({ type: DELETE_TICKET_SUCCESS, payload: success}); return success; 
  }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const success = await res.json();
      return deleteTicketSuccess(success);

    } catch (error) { dispatch ({ type: DELETE_TICKET_FAILURE, message: 'Could not delete ticket' }); return error; }
  }
};


