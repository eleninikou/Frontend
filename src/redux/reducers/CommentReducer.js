import {
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE
} from "../actions/comments/Action-Types";

const initialState = {
  comment: {},
  comments: [],
  isFetching: false,
  errorMessage: null,
  successMessage: null
};

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        comment: action.payload.comment,
        successMessage: action.payload.message
      };
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      };
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        comments: action.payload.comments
      };
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        successMessage: action.payload.message
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      };
    default:
      return state;
  }
};

export default CommentReducer;
