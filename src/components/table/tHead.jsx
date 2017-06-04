import React from 'react';

const THead = ({ colHeads }) => {
	const ths = colHeads.map( (heading, i) => {
		let cName = (i%2 != 1) ? 'wide' : '';
		return <th key={i} className={cName}>{heading}</th>;
	});

	return (
		<thead><tr>{ths}</tr></thead>
	);
}

export default THead;