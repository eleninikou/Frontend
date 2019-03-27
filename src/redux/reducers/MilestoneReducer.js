import {
    CREATE_MILESTONE_SUCCESS,
    CREATE_MILESTONE_FAILURE,
    DELETE_MILESTONE_SUCCESS,
    DELETE_MILESTONE_FAILURE,
  } from '../actions/milestones/Action-Types';

const initialState = {
    milestone: {},
    milestones: [],
    isFetching: false,
    errorMessage: null,
    successMessage: null
};

const MilestoneReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MILESTONE_SUCCESS:
        debugger;
            return {
                ...state,
                isFetching: false,
                milestone: action.payload.milestone,
                successMessage: action.payload.message
            } 
        case CREATE_MILESTONE_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }   
        case DELETE_MILESTONE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                successMessage: action.payload
            } 
        case DELETE_MILESTONE_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }                  
        default:
            return state;
    }
}

export default MilestoneReducer;