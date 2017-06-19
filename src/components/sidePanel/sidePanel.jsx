import React from 'react';
import NowPlaying from './currentTrack';
import Tabs from './tabs';
import UpNext from './upNext';
import Playlists from './playlists/playlists';
import Info from './Info';

const SidePanel = () => (
	<div className="col-md-3" id="side-panel">
		<NowPlaying />
		<Tabs />
		<div className="tab-content">
			<UpNext />
			<Playlists />
			<Info />
		</div>
	</div>
);

export default SidePanel;