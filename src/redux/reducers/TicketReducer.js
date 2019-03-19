import {
    GET_ALL_TICKETS_USER_REQUEST,
    GET_ALL_TICKETS_USER_SUCCESS,
    GET_ALL_TICKETS_USER_FAILURE
} from '../actions/tickets/Action-types';

const initialState = {
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
        default:
            return state;
    }
}

export default TicketReducer;