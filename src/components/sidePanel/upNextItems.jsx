import React from 'react';
import { PropTypes } from 'prop-types';
import Button from '../Button';
import { delTrack, togglePlayback, filterLib, playFrom, playTrack, clearSearch } from '../../actions/actions'
import * as filterType from '../../constants/filterTypes';

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

UpNextItem.contextTypes = {
	store: PropTypes.object
}

export const Item = ({ trk, idx }, { store }) => {
	const tracks = store.getState().library.tracks;

	return (
		<div
			className="up-next-item"
			onDoubleClick={ () => {
				store.dispatch( playFrom(trk, idx) );
				// store.dispatch( playTrack(store.getState().playback.status, [trk]) );
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
					onClick={ () => {
						store.dispatch( clearSearch() );
						store.dispatch( filterLib(tracks, trk[filterType.ARTIST], filterType.ARTIST) );
					}}
				>
					{trk.Artist}  
				</h6>
				<span className="divider"> | </span>
				<h6
					className="up-next-album"
					onClick={ () => {
						store.dispatch( clearSearch() );
						store.dispatch( filterLib(tracks, trk, filterType.ALBUM) );
					}}
				>
					{trk.Album}
				</h6>
			</div>
		</div>
	);
}

Item.contextTypes = {
	store: PropTypes.object
}