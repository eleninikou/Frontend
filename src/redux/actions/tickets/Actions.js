import {
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
    CREATE_TICKET_FAILURE
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

  export const ticketCreate = (token, ticket) => {
    return async dispatch => {  

      const createTicketSuccess = success => { 
        dispatch ({ type: CREATE_TICKET_SUCCESS, payload: success}); return ticket; 
    }

      const createTicketError = error => { dispatch ({ type: CREATE_TICKET_FAILURE, message: 'Could not fetch projects' }); return error; }
  
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/tickets`, {
          method: "POST",
          body: JSON.stringify(ticket),
          headers: {
            "Authorization": `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"}
        })
        const success = await res.json();
        debugger;
        return createTicketSuccess(success);
  
      } catch (error) { return createTicketError(error) }
    }
  };    

export const getTicketTypes = token => {
    return async dispatch => {
      const getTicketTypesRequest = () => { dispatch({ type: GET_TICKET_TYPES_REQUEST}) };
  
      const recieveTicketTypes = types => { 
        dispatch ({ type:  GET_TICKET_TYPES_SUCCESS, payload: types}); 
        return types; 
    }
  
      const TicketTypesError = error => { dispatch ({ type: GET_TICKET_TYPES_FAILURE, message: 'Could not fetch ticket types' }); return error; }
      try {
        getTicketTypesRequest();
        const res = await fetch(`http://127.0.0.1:8000/api/types`, {
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

export const getTicketStatus = token => {
  return async dispatch => {
    const getTicketStatusRequest = () => { dispatch({ type: GET_TICKET_STATUS_REQUEST}) };

    const recieveTicketStatus = Status => { 
      dispatch ({ type:  GET_TICKET_STATUS_SUCCESS, payload: Status}); 
      return Status; 
  }

    const TicketStatusError = error => { dispatch ({ type: GET_TICKET_STATUS_FAILURE, message: 'Could not fetch ticket status' }); return error; }
    try {
      getTicketStatusRequest();
      const res = await fetch(`http://127.0.0.1:8000/api/status`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json"}
      })
      const types = await res.json();
      return recieveTicketStatus(types);

    } catch (error) { return TicketStatusError(error) }
  }
};

