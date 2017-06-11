import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Button';
import { loadPlaylist, delPlaylist } from '../../actions/actions';

class Playlists extends Component {
	render() {
		console.log('Rendering Playlists.');
		const playlists = this.props.playlists;
		let lists = <li className="warning">No saved playlists.</li>;
		if (playlists.length) {
			lists = playlists.map( (list, i) => {
				return <Playlist key={i} index={i} list={list} name={Object.keys(list)} />;
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
	playlists: state.playlists
});

const Playlist = ({index, list, name}, { store }) => {
	return (
		<li className="playlist-item">
			<a 
				className="playlist-name"
				onClick={ e => {
					store.dispatch( loadPlaylist(list[name]) );
					$('#tabs a[href="#up-next"]').tab('show');
					e.preventDefault();
				}}
			>
				{name}
			</a>
			<Button
				icon="remove-circle"
				className="close"
				handler={ () => {
					store.dispatch( delPlaylist(index) );
				}}
			/>
		</li>
	);
}

Playlist.contextTypes = {
	store: React.PropTypes.object
}

export default connect(mapStateToProps)(Playlists);