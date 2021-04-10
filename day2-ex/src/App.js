import { useState, useEffect } from "react";
import ListDemo from "./ListDemo";

function Counter(props) {
	// Only run this on initial render... (arrow function)
	const initialCount = () => Number(props.count || localStorage.getItem("count"));

	const [count, setCount] = useState(initialCount);
	const [modifier, setModifier] = useState(1);

	useEffect(() => {
		localStorage.setItem("count", count);

		// Added count as a dependecy, as our compoenent can re-render for a magnitude of reasons. But we only want to store count in localstorage if that updates.
	}, [count]);

	const increment = () => setCount(count + modifier);
	const decrement = () => setCount(count - modifier);

	const handleChange = (event) => {
		setModifier(parseInt(event.target.value) || "");
	};

	return (
		<>
			<p>Counter {count}</p>
			<label>
				Modifier
				<input value={modifier} onChange={handleChange} />
			</label>
			<button onClick={increment}>Increase</button>
			<button onClick={decrement}>Decrease</button>
		</>
	);
}

function Jokes() {
	const [randomJoke, setRandomJoke] = useState("");
	const [chuckNorrisJoke, setChuckNorrissJoke] = useState("");

	const fetchRandomJoke = async (options) => {
		// Too lazy to have a different function for different locations.
		const fromUrl = options && options.from === "icanhazdadjoke" ? "https://icanhazdadjoke.com/" : "https://api.chucknorris.io/jokes/random";

		const config = {
			headers: {
				Accept: "application/json",
			},
		};

		const response = await (await fetch(fromUrl, config)).json();

		response.value ? setChuckNorrissJoke(response.value) : setRandomJoke(response.joke);
	};

	useEffect(() => {
		fetchRandomJoke({ from: "icanhazdadjoke" });
		const jokeTimer = setInterval(async () => await fetchRandomJoke({ from: "icanhazdadjoke" }), 10000);

		return () => clearInterval(jokeTimer);
	}, []);

	return (
		<>
			<h2>Chuck Norris Joke</h2>
			<p>{chuckNorrisJoke}</p>
			<button onClick={fetchRandomJoke}>Fetch Random Joke</button>
			<h2>Random Interval Joke</h2>
			<p>Updates every 10 seconds..</p>
			<p>{randomJoke}</p>
		</>
	);
}

function App() {
	return (
		<>
			<Counter />
			<Jokes />
			<ListDemo />
		</>
	);
}

export default App;
