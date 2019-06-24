import * as actionTypes from '../actions/actionConstants';
import initialState from './initialState';

function checkApiCallEnded(actionType) {
    return (actionType.includes("_SUCCESS"))
}
export default function apiStatusReducer(state = initialState.apiCallsInProgress, action) {
    if (action.type === actionTypes.START_API_CALL) {
        return state += 1;
    } else if (checkApiCallEnded(action.type)) {
        return state -= 1;
    }
    return state;
}