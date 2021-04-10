import React, { useState } from "react";

function MemberTable({ members }) {
	return (
		<table>
			<thead>
				<tr>
					<td>#</td>
					<td>name</td>
					<td>age</td>
				</tr>
			</thead>
			<tbody>
				{members.map((member, index) => (
					<tr key={index}>
						<td>{index}</td>
						<td>{member.name}</td>
						<td>{member.age}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

function MemberDemo(props) {
	return (
		<div>
			<h4>All Members</h4>
			<MemberTable members={props.members} />
		</div>
	);
}

export default function App() {
	const initialMembers = [
		{ name: "Peter", age: 18 },
		{ name: "Hanne", age: 35 },
		{ name: "Janne", age: 25 },
		{ name: "Holger", age: 22 },
	];
	const [members] = useState(initialMembers);

	return <MemberDemo members={members} />;
}
