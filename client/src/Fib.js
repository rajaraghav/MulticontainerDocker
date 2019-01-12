import React, { Component } from "react";
import axios from "axios";
class Fib extends Component {
	state = {
		seenIndices: [],
		values: {},
		index: ""
	};
	handleSubmit = async event => {
		event.preventDefault();
		await axios.post("/api/values", { value: this.state.index });
		this.setState({ index: "" });
	};
	renderSeenIndices() {
		console.log(this.state.seenIndices);
		return this.state.seenIndices.map(({ number }) => number).join(", ");
	}
	renderSeenValues() {
		const entries = [];
		for (let key in this.state.values) {
			if (key !== undefined && !isNaN(key)) {
				entries.push(
					<div key={key}>
						For index {key} i calculated {this.state.values[key]}
					</div>
				);
			}
		}

		return entries;
	}
	componentDidMount() {
		this.fetchValues();
		this.fetchIndexes();
	}
	async fetchValues() {
		const valuesRes = await axios.get("/api/values/current");
		const values = valuesRes.data;
		this.setState({ values });
	}
	async fetchIndexes() {
		const seenIndicesRes = await axios.get("/api/values/all");
		const seenIndices = seenIndicesRes.data;
		this.setState({ seenIndices });
	}
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>Enter index to find fib</label>
					<input
						value={this.state.index}
						onChange={event => this.setState({ index: event.target.value })}
					/>
					<button>Submit</button>
				</form>
				<h3>Indices I've seen</h3>
				{this.renderSeenIndices()}
				<h3>Calculated values</h3>
				{this.renderSeenValues()}
			</div>
		);
	}
}

export default Fib;
