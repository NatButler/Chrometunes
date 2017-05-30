import React from 'react';
import { PropTypes } from 'prop-types';
import { UpNextItem } from './upNextItems';
import Controls from './controls';
import Button from '../Button';

const UpNext = (props, { store }) => {
	const state = store.getState();
	let tracks = state.upnext.map( (trk, i) => {
		return <UpNextItem key={i} trk={trk} idx={i} />;
	});

	return (
		<div id="up-next" className="tab-pane active" role="tab-pane">
			<Controls />
			<ul id="up-next-ul">
				{tracks}
			</ul>
		</div>
	);
}

UpNext.contextTypes = {
	store: PropTypes.object
}

export default UpNext;