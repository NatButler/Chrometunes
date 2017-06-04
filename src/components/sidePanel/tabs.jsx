import React from 'react';

const Tabs = () => (
	<ul id="tabs" className="nav nav-pills">
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

export default Tabs;