import upper, { text1, text2, text3 } from "./file1";
import person, { males, females } from "./file2";
import { Welcome, MultiWelcome } from "./file3";

import "./App.css";

function App() {
	const { firstname, email } = person;

	// console.log([...males, ...females]);
	// console.log([...males, "Kurt", "Helle", ...females, "Tina"]);

	const person2 = {
		...person,
		friends: [...males, ...females],
		phone: 123456,
	};

	console.log(person2);

	return (
		<div>
			<div>
				<h2>Ex 1</h2>
				<p>{upper("Uppercase this text")}</p>
				<p>{text1}</p>
				<p>{text2}</p>
				<p>{text3}</p>
			</div>
			<div>
				<h2>Ex 2</h2>
				<p>
					{firstname}, {email}
				</p>
			</div>

			<div>
				<h2>Ex 3</h2>
				<MultiWelcome />
			</div>
		</div>
	);
}

export default App;
