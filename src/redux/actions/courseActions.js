import { CREATE_COURSE } from './actionConstants';
export function createCourse(course) {
    return { type: CREATE_COURSE, course };
}