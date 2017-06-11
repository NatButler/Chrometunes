import React from 'react';
import { PropTypes } from 'prop-types';

const TFoot = ( props, { store } ) => {
	console.log('Rendering TFoot.');
	const lib = store.getState().library;
	const playmode = store.getState().playback.nowPlaying.mode;
	const filter = lib.filter ? ` [${lib.filterType}] ${lib.filter}` : ' ALL';
	const query = lib.query ? ` : "${lib.query}"` : '';

	return ( 
		<tfoot className="col-md-9">
			<tr>
				<td>
					<span className="track-count">{(lib.query ? lib.search.length.toString() : false) || lib.filtered.length || lib.tracks.length} tracks</span>
					<span className="play-mode">{playmode.replace(/^[a-z]/, str => { return str.toUpperCase(); })}</span>
					<span className="filter-info"><h4>Filter: </h4>{filter}{query}</span>
				</td>
			</tr>
		</tfoot>
	);
}

TFoot.contextTypes = {
	store: PropTypes.object
}

export default TFoot;