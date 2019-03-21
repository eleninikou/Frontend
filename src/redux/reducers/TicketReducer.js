import {
    GET_ALL_TICKETS_USER_REQUEST,
    GET_ALL_TICKETS_USER_SUCCESS,
    GET_ALL_TICKETS_USER_FAILURE,
    GET_TICKET_TYPES_REQUEST,
    GET_TICKET_TYPES_SUCCESS,
    GET_TICKET_TYPES_FAILURE,
    GET_TICKET_STATUS_REQUEST,
    GET_TICKET_STATUS_SUCCESS,
    GET_TICKET_STATUS_FAILURE,
} from '../actions/tickets/Action-types';

const initialState = {
    ticketTypes: [],
    ticketStatus:[],
    allTickets: [],
    isFetching: false,
    errorMessage: null,
};

const TicketReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TICKETS_USER_REQUEST:
            return {
                ...state,
                isFetching: true,
            } 
        case GET_ALL_TICKETS_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                allTickets: action.payload
            } 
        case GET_ALL_TICKETS_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }   
        case GET_TICKET_TYPES_REQUEST:
            return {
                ...state,
                isFetching: true,
            } 
        case GET_TICKET_TYPES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ticketTypes: action.payload.types
            } 
        case GET_TICKET_TYPES_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            } 
        case GET_TICKET_STATUS_REQUEST:
            return {
                ...state,
                isFetching: true,
            } 
        case GET_TICKET_STATUS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ticketStatus: action.payload.status
            } 
        case GET_TICKET_STATUS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }                   
        default:
            return state;
    }
}

export default TicketReducer;