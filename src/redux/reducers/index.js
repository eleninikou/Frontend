import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FormReducer from './AuthReducer';
import ProjectReducer from './ProjectReducer';
import TicketReducer from './TicketReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    form: FormReducer,
    project: ProjectReducer,
    ticket: TicketReducer
})


export default rootReducer;