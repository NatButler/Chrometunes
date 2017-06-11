import React from 'react';
import PropTypes from 'prop-types';

const THead = (props, { store }) => {
	console.log('Rendering THead.');
	const ths = store.getState().app.tableHds.map( (heading, i) => {
		let cName = (i%2 != 1) ? 'wide' : '';
		return <th key={i} className={cName}>{heading}</th>;
	});

	return <thead><tr>{ths}</tr></thead>;
}

THead.contextTypes = {
	store: PropTypes.object
}

export default THead;