import React, { Component } from 'react';
import PlaybackControls from './playback';
import Menu from './menu';
import Search from './search';

class NavBar extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		console.log('Nav.');

		return (
			<nav className="navbar navbar-default">
				<button is="google-cast-button" id="cast-button"></button>
				<PlaybackControls />
				<Search />
				<Menu />
			</nav>
		);
	}
}

export default NavBar;