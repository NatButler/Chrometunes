import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Button';
import { loadPlaylist, delPlaylist, namePlaylist } from '../../actions/actions';

class Playlists extends Component {
	render() {
		console.log('Playlists.');
		const playlists = this.props.playlists;
		let lists = <Help />;
		if (playlists.length) {
			lists = playlists.map( (list, i) => {
				if (list.title === undefined) {
					return <NewPlaylist key={i} idx={i} id={list.id} />;
				}
				return <Playlist key={i} idx={i} id={list.id} list={list.tracks} title={list.title} />;
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

const Playlist = ({idx, id, list, title}, { store }) => {
	return (
		<li className="playlist-item">
			<a 
				className="playlist-name"
				onClick={e => {
					store.dispatch( loadPlaylist(list) );
					$('#tabs a[href="#up-next"]').tab('show');
					e.preventDefault();
				}}
			>
				{title}
			</a>
			<Button
				icon="remove-circle"
				className="close"
				handler={() => {
					store.dispatch( delPlaylist(idx) );
				}}
			/>
		</li>
	);
}

Playlist.contextTypes = {
	store: React.PropTypes.object
}

const NewPlaylist = ({ idx, id }, { store }) => {
	let input;
	return (
		<li className="new-playlist">
			<input
				ref={node => { input = node; }}
				type="text"
				name="plist-input"
				className="plist-input"
				placeholder="Input playlist name"
				spellCheck="false"
				autoComplete="off"
				autoFocus="true"
				onKeyPress={e => {
					if (!e) {e = window.event;}
					let keyCode = e.keyCode || e.which;
					if (keyCode == '13') {
						if (!input.value) { store.dispatch( delPlaylist(idx) ); }
			      else{ store.dispatch( namePlaylist(id, input.value) ); }
			      return false;
			    }
				}}
				onBlur={() => {
					if (!input.value) { store.dispatch( delPlaylist(idx) ); }
					else { store.dispatch( namePlaylist(id, input.value) ); }
				}}
			/>
		</li>
	);
}

NewPlaylist.contextTypes = {
	store: React.PropTypes.object
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
			&nbsp;list and click 'SAVE' to store a playlist</p>
	</li>
);

export default connect(mapStateToProps)(Playlists);