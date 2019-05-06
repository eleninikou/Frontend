import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ProjectReducer from "./ProjectReducer";
import TicketReducer from "./TicketReducer";
import MilestoneReducer from "./MilestoneReducer";
import CommentReducer from "./CommentReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  project: ProjectReducer,
  ticket: TicketReducer,
  milestone: MilestoneReducer,
  comment: CommentReducer
});

export default rootReducer;
