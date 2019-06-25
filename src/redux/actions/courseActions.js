import * as actionTypes from './actionConstants';
import * as courseApi from '../../api/courseApi';
import startApiCall from './apiStatusActions';
export function createCourse(course) {
    return { type: actionTypes.CREATE_COURSE, course };
}

export function loadCourses() {
    return function (dispatch) {
        dispatch(startApiCall());
        return courseApi.getCourses().then(courses => {
            dispatch(loadCourseSuccess(courses));
        }).catch(error => {
            throw error;
        })
    }
}
export function saveCourse(course) {
    return function (dispatch) {
        dispatch(startApiCall());
        return courseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCourseSuccess(savedCourse)) :
                dispatch(createCourseSuccess(savedCourse));
        }).catch(error => {
            throw error;
        })
    }
}
function loadCourseSuccess(courses) {
    return { type: actionTypes.LOAD_COURSES_SUCCESS, courses }
}
function createCourseSuccess(course) {
    return { type: actionTypes.CREATE_COURSE_SUCCESS, course }
}
function updateCourseSuccess(course) {
    return { type: actionTypes.UPDATE_COURSE_SUCCESS, course }
}