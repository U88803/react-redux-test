import React, { Component } from 'react';

export default class CoursesComponent extends Component {
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
        alert(this.state.course.title);
    }
    render = () => {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Courses</h2>
                <h3>Add Course</h3>
                <input type="text" value={this.state.course.title} onChange={this.handleChange} />
                <button type="submit" >Save</button>
            </form>
        );
    }
}

