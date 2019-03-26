import {
    GET_PROJECT_REQUEST,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_FAILURE,
    GET_PROJECTS_BY_USER_REQUEST,
    GET_PROJECTS_BY_USER_SUCCESS,
    GET_PROJECTS_BY_USER_FAILURE,
    GET_ALL_PROJECTS_USER_REQUEST,
    GET_ALL_PROJECTS_USER_SUCCESS,
    GET_ALL_PROJECTS_USER_FAILURE,
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAILURE,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAILURE,
} from '../actions/projects/Action-types';

const initialState = {
    project: {},
    projects: [],
    team: [],
    allProjects: [],
    isFetching: false,
    errorMessage: null,
    successMessage: null
};

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECT_REQUEST:
            return {
                ...state,
                isFetching: true,
            } 
        case GET_PROJECT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                project: action.payload.project,
                team: action.payload.team
            } 
        case GET_PROJECT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }   
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
                allProjects: action.payload.projects
            } 
        case GET_ALL_PROJECTS_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }    
        case CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                Project: action.payload
            } 
        case  CREATE_PROJECT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }   
        case UPDATE_PROJECT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                project: action.payload.project,
                successMessage: action.payload.message
            } 
        case  UPDATE_PROJECT_FAILURE:
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