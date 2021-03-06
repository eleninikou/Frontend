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
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_EMAIL_REQUEST,
  GET_EMAIL_SUCCESS,
  GET_EMAIL_FAILURE,
  ACCEPT_INVITATION_SUCCESS,
  ACCEPT_INVITATION_FAILURE
} from "../actions/auth/Action-types";

const initialState = {
  user: {},
  email: "",
  existing: false,
  isFetching: false,
  text: '',
  errorMessage: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        text: 'Logging You In...'
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        text: 'Creating Account...'
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      };
    case GOOGLE_AUTH_REQUEST:
      return {
        ...state,
        isFetching: true,
        text: 'Logging You In!'
      };
    case GOOGLE_AUTH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload
      };
    case GOOGLE_AUTH_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
        text: 'Fetching You!'
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload.user
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload.user,
        successMessage: action.payload.message
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      };
    case GET_EMAIL_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case GET_EMAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        email: action.payload.email,
        existing: action.payload.existing
      };
    case GET_EMAIL_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      };
    case ACCEPT_INVITATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.payload
      };
    case ACCEPT_INVITATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      };
    default:
      return state;
  }
};

export default authReducer;
