import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Playlist from './playlist';
import NewPlaylist from './newPlaylist';
import { loadPlaylists } from '../../../actions/actions';

class Playlists extends Component {
	componentWillReceiveProps(nextProps) {
		const { store } = this.context;
		if (this.props.libId !== nextProps.libId) {
			store.dispatch( loadPlaylists(nextProps.libId) );
		}
	}

	shouldComponentUpdate(nextProps) {
		return this.props.libId === nextProps.libId || this.props.playlists !== nextProps.playlists;
	}

	render() {
		console.log('Playlists.');
		const playlists = this.props.playlists;
		let lists = <Help />;
		if (playlists.length) {
			lists = playlists.map( (list, i) => {
				if (list.title === undefined) {
					return <NewPlaylist key={list.id} idx={i} id={list.id} />;
				}
				return <Playlist key={list.id} idx={i} id={list.id} list={list.tracks} title={list.title} />;
			});
		}

		return (
	    <div id="playlists" className="tab-pane" role="tab-pane">
	      <ul id="playlists-ul">{lists}</ul>
	    </div>
		);
	}
}

const mapStateToProps = state => ({
	libId: state.library.id,
	playlists: state.playlists
});

Playlists.contextTypes = {
	store: PropTypes.object.isRequired
}

const Help = () => (
	<li className="help">
		<p>Add tracks to the&nbsp;
			<a 
				href="#"
				onClick={e => {
					$('#tabs a[href="#up-next"]').tab('show');
					e.preventDefault();
				}}
			>'Up-next'</a>
			&nbsp;list; click 'SAVE' to store a playlist</p>
	</li>
);

export default connect(mapStateToProps)(Playlists);