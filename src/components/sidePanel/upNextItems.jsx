import React from 'react';
import { PropTypes } from 'prop-types';
import Button from '../Button';
import { delTrack, filterLib, playFrom, clearSearch } from '../../actions/actions'
import * as fT from '../../constants/filterTypes';

export const UpNextItem = ({ trk, idx }, { store }) => (
	<li>
		<Button
			className="close"
			icon="remove-circle"
			handler={ () => {
				store.dispatch( delTrack(idx) );
			}}
		/>
		<Item trk={trk} idx={idx} />
	</li>
);

UpNextItem.propTypes = {
	trk: PropTypes.object.isRequired,
	idx: PropTypes.number.isRequired
}

UpNextItem.contextTypes = {
	store: PropTypes.object
}

export const Item = ({ trk, idx }, { store }) => {
	const lib = store.getState().library.tracks;

	return (
		<div
			className="up-next-item"
			onDoubleClick={() => {
				store.dispatch( playFrom(trk, idx) );
			}}
		>
			<div className="title-wrap">
				<h5>
					<span className="title">{trk.Title}</span>
				</h5>
					<span className="duration">{'[ ' + trk.Duration + ' ]'}</span>
			</div>
			<div className="artist-wrap">
				<h6
					className="up-next-artist"
					onClick={() => {
						let state = store.getState().library;
						if (state.query) {
							store.dispatch( clearSearch() );
							$('#searchInput').val('').focus();
						}
						if (state.filter !== trk[fT.ARTIST]) {
							store.dispatch( filterLib(lib, trk[fT.ARTIST], fT.ARTIST) );
						}
					}}
				>
					{trk.Artist}  
				</h6>
				<span className="divider"> | </span>
				<h6
					className="up-next-album"
					onClick={() => {
						let state = store.getState().library;
						if (state.query) { 
							store.dispatch( clearSearch() ); 
							$('#searchInput').val('').focus();
						}
						if (state.filter !== trk[fT.ALBUM]) {
							store.dispatch( filterLib(lib, trk, fT.ALBUM) );
						}
					}}
				>
					{trk.Album}
				</h6>
			</div>
		</div>
	);
}

Item.propTypes = {
	trk: PropTypes.object.isRequired,
	idx: PropTypes.number.isRequired
}

Item.contextTypes = {
	store: PropTypes.object
}