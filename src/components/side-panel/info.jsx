import React from 'react';
import { PropTypes } from 'prop-types';

const Info = ({ track }) => {
	let infoList;
	if (track) {
		infoList = Object.keys(track).map( (key, i) => {
			let prop = track[key];
			if (key === 'Location') {
				prop = prop.replace(/%20/g, ' ');
			}
			return <li key={i}><span className="infoKey">{key}</span>: {prop}</li>;
		});
	} else {
		infoList = <li className="warning">No track info to display.</li>
	}

	return (
		<div id="info" className="tab-pane" role="tab-pane">
			<ul>{infoList}</ul>
		</div>
	);
}

export default Info;