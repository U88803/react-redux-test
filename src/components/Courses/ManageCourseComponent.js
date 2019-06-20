import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
const newCourse = {
    id: null,
    title: "",
    authorId: null,
    category: ""
};
function ManageCourseComponent({ courses, authors, loadAuthors, loadCourses, ...props }) {
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
        const { value, name } = event.target;
        setCourse((prevCourse) => ({
            [name]: (name === 'authorId') ? parseInt(value, 10) : value
        }));
    }

    return (
        <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} />
    );

}

ManageCourseComponent.propTypes = {
    courses: PropTypes.array.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        course: newCourse,
        courses: state.courses,
        authors: state.authors
    }
}
const mapDispatchToProps = {
    loadCourses,
    loadAuthors
}

// TYPE 1: without mapDispatchToProps
// export default connect(mapStateToProps)(ManageCourseComponent);

// TYPE 2: with mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(ManageCourseComponent);