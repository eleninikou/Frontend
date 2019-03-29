import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    GOOGLE_AUTH_REQUEST,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAILURE,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
} from '../actions/auth/Action-types';

const initialState = {
    user: {},
    isFetching: false,
    isAuthenticated: false,
    errorMessage: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
            } 
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                user: action.payload
            } 
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            }  
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false
            }
        case REGISTER_REQUEST:
            return {
                ...state,
                isFetching: true 
            } 
        case REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                user: action.payload
            } 
        case REGISTER_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }  
        case GOOGLE_AUTH_REQUEST:
            return {
                ...state,
                isFetching: true 
            } 
        case GOOGLE_AUTH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                user: action.payload
            } 
        case GOOGLE_AUTH_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }     
        case GET_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                user: action.payload.user
            } 
        case GET_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }  
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                user: action.payload.user
            } 
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }      
        default:
            return state;
    }
}

export default authReducer;