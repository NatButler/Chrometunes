import React from 'react';

const THead = ({ colHeads, colWidth }) => {
	const ths = colHeads.map( (heading, i) => {
		let w = (i%2 != 1) ? colWidth : "auto";
		let cName = (i%2 != 1) ? 'wide' : "";
		return <th key={i} className={cName} width={w}>{heading}</th>;
	});

	return (
		<thead><tr>{ths}</tr></thead>
	);
}

export default THead;