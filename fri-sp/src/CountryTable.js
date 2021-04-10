import React, { useEffect, useState } from "react";
import countryFacade from "./countryFacade";

const CountryTable = () => {
	const [labels, setLabels] = useState([]);
	const [countries, setCountries] = useState([]);
	const [lastUpdated, setLastUpdated] = useState(new Date());
	const [sortedBy, setSortedBy] = useState("name");

	async function sortCountries(label) {
		const countriesCopy = [...(await countryFacade.getCountries())];

		label = label?.toLowerCase();

		if (!label) label = sortedBy;

		if (countriesCopy[0][label] && typeof countriesCopy[0][label] === "object") return;
		setSortedBy(label);

		const method = !isNaN(countriesCopy[0][label])
			? (a, b) => {
					return a[label] - b[label];
			  }
			: (a, b) => {
					return a[label] && typeof a[label] != "object" ? a[label].localeCompare(b[label]) : null;
			  };

		countriesCopy.sort(method);
		setCountries(countriesCopy);
	}

	useEffect(() => {
		async function fetchData() {
			setLabels(await countryFacade.getLabels());
			await sortCountries();

			setLastUpdated(new Date());
		}
		fetchData();
		const updater = setInterval(async () => await fetchData(), 5000);
		return () => clearInterval(updater);
	}, [sortedBy]);

	return (
		<div>
			<h3>Last updated {lastUpdated.toLocaleTimeString()}</h3>
			<h5>Sorted by {sortedBy} - Click on any Table Header to change the sorting...</h5>
			<table className="table">
				<thead>
					<tr>
						{labels.map((label) => (
							<td className={label.toLowerCase() == sortedBy ? "active" : ""} onClick={() => sortCountries(label)} key={label}>
								{label}
							</td>
						))}
					</tr>
				</thead>

				<tbody>
					{countries.map((country, index) => (
						<tr key={index}>
							{
								// Fancy getter, cus we already know the labels.
								// Unfortunately this doesn't work as the label names does not match the country data-keys...
							}
							{
								// labels.map((label) => (
								//     <td key={label}>{country[label.toLowerCase()]}</td>
								// ))
							}
							{
								// Instead we will just loop over all the values of the country object.
								// Obviously the drawback here is that our labels have to be in the exact order of our values..
								// But we would have the same problem if we manually entered all of them, so I see this as the best solution.
							}
							{Object.values(country).map((val, index) => {
								// Array's are to be listed: "FirstElement(+remaining)" [BR(+5)]
								val = Array.isArray(val) && val.length > 1 ? `${val[0]}(+${val.length - 1})` : val;
								return <td key={index}>{val}</td>;
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default CountryTable;
