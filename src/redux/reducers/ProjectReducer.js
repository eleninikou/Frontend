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
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
    GET_ACTIVITY_REQUEST,
    GET_ACTIVITY_SUCCESS,
    GET_ACTIVITY_FAILURE,
    GET_ROLES_SUCCESS,
    GET_ROLES_FAILURE,
    GET_TEAM_SUCCESS,
    GET_TEAM_FAILURE,
    INVITATION_SUCCESS,
    INVITATION_FAILURE,
    GET_INVITATIONS_SUCCESS,
    GET_INVITATIONS_FAILURE,
} from '../actions/projects/Action-types';

const initialState = {
    project: {},
    projects: [],
    tickets:[],
    milestones: [],
    team: [],
    emails: [],
    roles: [],
    allProjects: [],
    activity: [],
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
                team: action.payload.team,
                tickets: action.payload.tickets
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
                allProjects: action.payload.projects,
                milestones: action.payload.milestones[0]
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
                project: action.payload.project,
                successMessage: action.payload.message
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
        case  DELETE_PROJECT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }   
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                successMessage: action.payload.message
            }  
        case GET_ACTIVITY_REQUEST:
            return {
                ...state,
                isFetching: true,
            } 
        case GET_ACTIVITY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                activity: action.payload.activity
            } 
        case GET_ACTIVITY_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }
        case GET_ROLES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                roles: action.payload.roles
            } 
        case GET_ROLES_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }   
        case GET_TEAM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                team: action.payload.team
            } 
        case GET_TEAM_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }   
        case INVITATION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                successMessage: action.payload.message
            } 
        case INVITATION_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            } 
        case GET_INVITATIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                emails: action.payload.emails
            } 
        case GET_INVITATIONS_FAILURE:
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