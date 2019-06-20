import * as actionTypes from './actionConstants';
import * as courseApi from '../../api/courseApi';
export function createCourse(course) {
    return { type: actionTypes.CREATE_COURSE, course };
}

export function loadCourses() {
    return function (dispatch) {
        return courseApi.getCourses().then(courses => {
            dispatch(loadCourseSuccess(courses));
        }).catch(error => {
            throw error;
        })
    }
}
export function saveCourse(course) {
    return function (dispatch) {
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
function createCourseSuccess(courses) {
    return { type: actionTypes.CREATE_COURSE_SUCCESS, courses }
}
function updateCourseSuccess(courses) {
    return { type: actionTypes.UPDATE_COURSE_SUCCESS, courses }
}