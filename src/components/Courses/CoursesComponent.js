import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
class CoursesComponent extends Component {
    state = {
        course: {
            title: ""
        }
    };
    componentDidMount() {
        const { courses, authors, actions } = this.props;
        if (courses.length === 0) {
            actions.loadCourses().catch(error => {
                throw error;
            });
        }
        if (authors.length === 0) {
            actions.loadAuthors().catch(error => {
                throw error;
            });
        }


    }
    handleChange = (event) => {
        const courseObj = { ...this.state.course, title: event.target.value };
        this.setState({ course: courseObj });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        // this.props.dispatch(courseActions.createCourse(this.state.course));
        console.log(this.state);
        this.props.actions.createCourse(this.state.course);
        this.setState({ course: { title: "" } });
    }
    render = () => {
        return (
            <>
                {/* // <form onSubmit={this.handleSubmit}> */}
                <h2>Courses</h2>
                <CourseList courses={this.props.courses} />
                {/* <h3>Add Course</h3>
                <input type="text" value={this.state.course.title} onChange={this.handleChange} />
                <button type="submit" >Save</button>
                {this.props.courses.map(course => (
                    <div key={course.title} >{course.title}</div>
                ))} */}
                {/* // </form> */}
            </>
        );
    }
}

CoursesComponent.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
}

function mapStateToProps(state) {
    return {
        // courses: state.courses
        courses: state.authors.length === 0 ? [] :
            state.courses.map(course => {
                return {
                    ...course,
                    authorName: state.authors.find(author => author.id === course.authorId).name
                }
            }),
        authors: state.authors
    }
}
function mapDispatchToProps(dispatch) {
    return {
        //createCourse: course => dispatch(courseActions.createCourse(course))
        // actions: bindActionCreators(courseActions, dispatch)
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    }
}
// TYPE 1: without mapDispatchToProps
// export default connect(mapStateToProps)(CoursesComponent);

// TYPE 2: with mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(CoursesComponent);