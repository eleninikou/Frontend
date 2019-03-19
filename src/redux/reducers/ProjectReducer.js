import {
    GET_PROJECTS_BY_USER_REQUEST,
    GET_PROJECTS_BY_USER_SUCCESS,
    GET_PROJECTS_BY_USER_FAILURE,
    GET_ALL_PROJECTS_USER_REQUEST,
    GET_ALL_PROJECTS_USER_SUCCESS,
    GET_ALL_PROJECTS_USER_FAILURE,
} from '../actions/projects/Action-types';

const initialState = {
    projects: [],
    allProjects: [],
    isFetching: false,
    errorMessage: null,
};

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECTS_BY_USER_REQUEST:
            return {
                ...state,
                isFetching: true,
            } 
        case GET_PROJECTS_BY_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                projects: action.payload
            } 
        case GET_PROJECTS_BY_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }   
        case GET_ALL_PROJECTS_USER_REQUEST:
            return {
                ...state,
                isFetching: true,
            } 
        case GET_ALL_PROJECTS_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                allProjects: action.payload
            } 
        case GET_ALL_PROJECTS_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }       
        default:
            return state;
    }
}

export default ProjectReducer;