import React from 'react';
import THead from './tHead';
import TBody from './tBody';
import TFoot from './tFoot';

const Table = () => {
	console.log('Rendering Table.');
	return (
		<table className="col-md-9 table-striped table-condensed tableTag">
			<THead />
			<TBody />
			<TFoot />
		</table>
	);
}

export default Table;