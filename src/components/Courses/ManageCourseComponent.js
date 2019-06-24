import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
const newCourse = {
    id: null,
    title: "",
    authorId: null,
    category: ""
};
function ManageCourseComponent({ courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props }) {
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => {
                throw error;
            });
        }
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                throw error;
            });
        }
    }, []);
    const handleChange = (event) => {
        const { name, value } = event.target;
        const newObject = { [name]: ((name === 'authorId') ? parseInt(value, 10) : value) }
        setCourse(prevCourse => (
            { ...prevCourse, ...newObject }));

    }
    const handleSave = (event) => {
        event.preventDefault();
        saveCourse(course).then(() => {
            history.push('/courses');
        });
    }

    return (
        <CourseForm
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
            onSave={handleSave}
        />
    );

}

ManageCourseComponent.propTypes = {
    courses: PropTypes.array.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}
function getCourseDetailsBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}
function mapStateToProps(state, ownProps) {
    console.log(ownProps);
    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length ? getCourseDetailsBySlug(state.courses, slug) : newCourse;
    return {
        // course: newCourse,
        course,
        courses: state.courses,
        authors: state.authors
    }
}
const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
}

// TYPE 1: without mapDispatchToProps
// export default connect(mapStateToProps)(ManageCourseComponent);

// TYPE 2: with mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(ManageCourseComponent);