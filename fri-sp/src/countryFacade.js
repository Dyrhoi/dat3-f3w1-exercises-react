//Add imports here

const countryFacade = () => {
	const getLabels = async () => {
		return await (await fetch("http://localhost:3333/labels")).json();
	};

	const getCountries = async () => {
		return await (await fetch("http://localhost:3333/countries")).json();
	};
	return {
		getLabels,
		getCountries,
	};
};

export default countryFacade();
