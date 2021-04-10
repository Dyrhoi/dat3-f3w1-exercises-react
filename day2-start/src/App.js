import React, { useEffect, useState } from "react";
import "./App.css";

class Time extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			time: new Date(),
		};
	}

	render() {
		return (
			<>
				<p>Current time {this.state.time?.toLocaleTimeString() || "not set."}</p>
				<button onClick={() => this.setState({ time: new Date() })}>Update time</button>
			</>
		);
	}
}

function WordList() {
	const [value, setValue] = useState("");
	const [list, setList] = useState([]);

	function handleSubmit(event) {
		event.preventDefault();

		setList([...list, value]);
		setValue("");
	}

	function handleChange(event) {
		setValue(event.target.value);
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Write text to add to list.
					<input type="text" value={value} onChange={handleChange} />
				</label>
				<input type="submit" onClick={handleSubmit} value="Push" />
			</form>
			<p>Words: {list.join(", ")}</p>
		</>
	);
}

function AlbumsTable() {
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		async function fetchAlbums() {
			const response = await (await fetch("https://jsonplaceholder.typicode.com/albums")).json();

			setAlbums(response);
		}
		fetchAlbums();
	});

	return (
		<>
			<table>
				<thead>
					<tr>
						<td>#</td>
						<td>Title</td>
						<td>Author Id</td>
					</tr>
				</thead>
				<tbody>
					{albums.map((album) => (
						<tr key={album.id}>
							<td>{album.id}</td>
							<td>{album.title}</td>
							<td>{album.userId}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

function App() {
	return (
		<>
			<h1>Day 2</h1>
			<h2>Ex 1</h2>
			<div>
				<Time />
			</div>
			<h2>Ex 2</h2>
			<div>
				<WordList />
			</div>
			<h2>Extra</h2>
			<div>
				<AlbumsTable />
			</div>
		</>
	);
}

export default App;
