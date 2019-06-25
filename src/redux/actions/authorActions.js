import * as actionTypes from './actionConstants';
import * as authorApi from '../../api/authorApi';
import startApiCall from './apiStatusActions';

export function loadAuthors() {
    return function (dispatch) {
        dispatch(startApiCall());
        return authorApi.getAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw error;
        })
    }
}
function loadAuthorsSuccess(authors) {
    return { type: actionTypes.LOAD_AUTHORS_SUCCESS, authors }
}