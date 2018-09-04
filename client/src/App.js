import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Page from "./Page";
import Fib from "./Fib";
class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Route exact path="/" component={Fib} />
					<Route exact path="/page" component={Page} />
				</div>
			</Router>
		);
	}
}

export default App;
