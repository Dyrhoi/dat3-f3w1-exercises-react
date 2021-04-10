import { persons } from "./file2";

function Welcome(props) {
	return <h1>Hello, {props.name}</h1>;
}

function WelcomePerson({ person }) {
	return (
		<p>
			Hello, {person.firstName} {person.lastName} ({person.email})
		</p>
	);
}

function MultiWelcome() {
	return (
		<div>
			<Welcome name="Sara" />
			<Welcome name="Cahal" />
			<Welcome name="Edith" />

			{persons.map((person, index) => (
				<WelcomePerson key={index} person={person} />
			))}
		</div>
	);
}

export { Welcome, MultiWelcome };
