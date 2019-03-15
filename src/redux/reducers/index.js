import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FormReducer from './AuthReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    form: FormReducer
})


export default rootReducer;