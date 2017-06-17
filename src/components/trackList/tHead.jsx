import React from 'react';
import Filter from '../NavBar/filter';

const THead = ({ tableHds }) => {
	console.log('THead.');
	const ths = tableHds.map( (heading, i) => {
		let cName = (i%2 != 1) ? 'wide' : heading;
		return <li key={i} className={cName}>{heading}</li>;
	});

	return (
		<header>
			<ul className="thead">{ths}</ul>
			<Filter />
		</header>
	);
}

export default THead;