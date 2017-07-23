import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { addTrack, addDisc, addRemDisc, playTrack } from '../../actions/actions';

class TRow extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { store } = this.context;
		const playback = store.getState().playback.nowPlaying;
		const { lib, index, track, trClass } = this.props;

		return (
			<li
				ref="row"
				className={trClass}
				onDoubleClick={() => {
					store.dispatch( playTrack(lib, index, playback.mode, [track['PId']], playback.track) );
					store.dispatch( addRemDisc(track, lib) );
				}}
			>
				<div className="wide">{track['Artist']}</div>
				<div className="duration">{track['Duration']}</div>
				<div className="wide">
					<a 
						href="#"
						onClick={e => {
							store.dispatch( addDisc(track, lib) );
							e.preventDefault;
						}}
					>
						{track['Album']}
					</a>
				</div>
				<div className="track">{track['Track']}</div>
				<div className="wide">
					<a 
						href="#"
						onClick={e => {
							store.dispatch( addTrack(track['PId']) );
							e.preventDefault;
						}}
					>
						{track['Title']}
					</a>
				</div>
			</li>
		);
	}
}

TRow.contextTypes = {
	store: PropTypes.object
}

TRow.propTypes = {
	track: PropTypes.object.isRequired,
	lib: PropTypes.array.isRequired,
	index: PropTypes.array.isRequired,
	trClass: PropTypes.string
}

export default TRow;