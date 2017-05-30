import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import NowPlaying from './currentTrack';
import UpNext from './upNext';
import Playlists from './playlists';
import Info from './Info';

class SidePanel extends Component {
	// componentDidMount() {
	// 	const { store } = this.context;
	// 	this.unsubscribe = store.subscribe( () =>
	// 		this.forceUpdate()
	// 	);
	// }

	// componentWillUnmount() {
	// 	this.unsubscribe();
	// }

	render() {
		const { store } = this.context;
		const state = store.getState();
		let playlists = store.getState().playlists;
		let currentTrack = (state.playback.track) ? <NowPlaying /> : '';

		return(
			<div className="col-md-3" id="side-panel">
				{currentTrack}
				<Tabs />
				<div className="tab-content">
					<UpNext />
					<Playlists playlists={playlists} />
					<Info track={state.playback.track} />
				</div>
			</div>
		);
	}
}

SidePanel.contextTypes = {
	store: PropTypes.object
}

const Tabs = () => {
	return (
		<ul className="nav nav-pills">
			<li className="active">
				<a data-toggle="pill" href="#up-next" role="tab">
					<span className="glyphicon glyphicon-list"></span>
				</a>
			</li>
			<li>
				<a data-toggle="pill" href="#playlists" role="tab">
					<span className="glyphicon glyphicon-folder-open"></span>
				</a>
			</li>
			<li id="info-tab">
				<a data-toggle="pill" href="#info" role="tab">
					<span className="glyphicon glyphicon-info-sign"></span>
				</a>
			</li>
		</ul>
	);
}

export default SidePanel;