import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from '../components';
import { delTrack, togglePlayback, filterLib, playFrom, playTrack, clearSearch } from '../../actions/actions'
import { trkFilter } from '../../librarySearch';
import * as filters from '../../constants/filters';

export const NowPlaying = (props, { store }) => {
	const audio = document.getElementById('player');
	const playback = store.getState().playback;

	return (
		<li id="current-track">
			<Button 
				icon={(playback.state === 'play') ? 'pause' : 'play'}
				className="playback"
				handler={ () => {
					store.dispatch( togglePlayback() );
					(playback.state === 'play') ? audio.pause() : audio.play();
				}}
			/>
			<Item trk={playback.track} />
		</li>
	);
}

NowPlaying.contextTypes = {
	store: PropTypes.object
}

export const UpNextItem = ({ trk, idx }, { store }) => {
	return (
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
}

UpNextItem.contextTypes = {
	store: PropTypes.object
}

const Item = ({ trk, idx }, { store }) => {
	const tracks = store.getState().library.tracks;
	return (
		<div 
			className="up-next-item"
			onDoubleClick={ () => {
				store.dispatch( playFrom(idx) );
				store.dispatch( playTrack('normal', [trk]) );
			}}
		>
			<div className="title-wrap">
				<h5>
					<span className="title">{trk.Title}</span>
				</h5>
					<span className="duration">{'[ ' + trk.Duration + ' ]'}</span>
			</div>
			<h6
				className="up-next-artist"
				onClick={ () => {
					store.dispatch( clearSearch() );
					store.dispatch( filterLib( trkFilter(trk.Artist, filters.ARTIST, tracks), trk.Artist, filters.ARTIST ) );
				}}
			>
				{trk.Artist}  
			</h6>
			<span className="divider"> | </span>
			<h6
				className="up-next-album"
				onClick={ () => {
					store.dispatch( clearSearch() );
					store.dispatch( filterLib( trkFilter(trk.Album, filters.ALBUM, tracks), trk.Album, filters.ALBUM) );
				}}
			>
				{trk.Album}
			</h6>
		</div>
	);
}

Item.contextTypes = {
	store: PropTypes.object
}