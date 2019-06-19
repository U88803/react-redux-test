import { combineReducers } from 'redux';
import courseReducer from './courseReducers';
const rootReducer = combineReducers({
    courses: courseReducer
});

export default rootReducer;