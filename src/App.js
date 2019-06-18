import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import AboutPage from './components/about/AboutPage';
import HomePage from './components/home/HomePage';
import Header from './components/common/Header';
import PageNotFound from './components/PageNotFound';
import CoursesComponent from './components/Courses/CoursesComponent';
const App = () => {
	return (
		<div className="container">
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/courses" component={CoursesComponent} />
				<Route path="/about" component={AboutPage} />
				<Route component={PageNotFound} />
			</Switch>
		</div>
	);
}

export default App;
