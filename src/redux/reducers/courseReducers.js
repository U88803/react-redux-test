import { CREATE_COURSE } from '../actions/actionConstants';

export default function courseReducer(state = [], action) {
    switch (action.type) {
        case CREATE_COURSE:
            console.log(action);
            return [...state, { ...action.course }];
        default:
            return state;
    }
}