import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
class CoursesComponent extends Component {
    state = {
        course: {
            title: ""
        }
    };
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
            <form onSubmit={this.handleSubmit}>
                <h2>Courses</h2>
                <h3>Add Course</h3>
                <input type="text" value={this.state.course.title} onChange={this.handleChange} />
                <button type="submit" >Save</button>
                {this.props.courses.map(course => (
                    <div key={course.title} >{course.title}</div>
                ))}
            </form>
        );
    }
}

CoursesComponent.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
}

function mapStateToProps(state) {
    return {
        courses: state.courses
    }
}
function mapDispatchToProps(dispatch) {
    return {
        //createCourse: course => dispatch(courseActions.createCourse(course))
        actions: bindActionCreators(courseActions, dispatch)
    }
}
// TYPE 1: without mapDispatchToProps
// export default connect(mapStateToProps)(CoursesComponent);

// TYPE 2: with mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(CoursesComponent);