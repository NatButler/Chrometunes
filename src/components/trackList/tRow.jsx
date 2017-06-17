import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { addTrack, addDisc, addRemDisc, playTrack } from '../../actions/actions';

class TRow extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { store } = this.context;
		const props = this.props;
		const playback = store.getState().playback.nowPlaying;

		return (
			<li
				ref="row"
				className={props.trClass}
				onDoubleClick={() => {
					store.dispatch( playTrack(props.lib, props.index, playback.mode, [props.track['PId']], playback.track) );
					store.dispatch( addRemDisc(props.track, props.lib) );
				}}
			>
				<div className="wide">{props.track['Artist']}</div>
				<div className="duration">{props.track['Duration']}</div>
				<div className="wide">
					<a 
						href="#"
						onClick={e => {
							store.dispatch( addDisc(props.track, props.lib) );
							e.preventDefault;
						}}
					>
						{props.track['Album']}
					</a>
				</div>
				<div className="track">{props.track['Track']}</div>
				<div className="wide">
					<a 
						href="#"
						onClick={e => {
							store.dispatch( addTrack(props.track['PId']) );
							e.preventDefault;
						}}
					>
						{props.track['Title']}
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
	track: PropTypes.object,
	lib: PropTypes.array.isRequired,
	index: PropTypes.array.isRequired,
	trClass: PropTypes.string
}

export default TRow;