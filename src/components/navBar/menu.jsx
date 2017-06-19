import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuItem from './menuItem';
import Button from '../Button';
import { loadLibrary, saveList, setPlaymode } from '../../actions/actions';
import * as playmode from '../../constants/playModes';

class Menu extends Component {
	shouldComponentUpdate(nextProps) {
		return this.props.playMode !== nextProps.playMode || !this.props.upnext.length && nextProps.upnext.length || this.props.upnext.length && !nextProps.upnext.length || !this.props.isPlaylists && nextProps.isPlaylists || this.props.isPlaylists && !nextProps.isPlaylists;
	}

	render() {
		console.log('Menu.');
		const props = this.props;

		return (
	    <div className="dropdown">
				<Button
					className="dropdown-toggle btn btn-secondary"
					id="dropdownMenuButton"
					dataToggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
					icon="option-vertical"
					handler={() => {  }}
				/>

				<ul
					className="dropdown-menu dropdown-menu-right"
					aria-labelledby="dropdownMenu1"
				>
			  	<MenuItem
			  		title="Load library"
			  		handler={e => {
			  			props.onImportLib(); 
			  			e.preventDefault(); 
			  		}}
			  	/>
			  	<MenuItem
			  		title="Load playlist"
			  		status={props.isPlaylists ? '' : 'disabled'}
			  		handler={e => {
			  			$('#tabs a[href="#playlists"]').tab('show');
			  			e.preventDefault(); 
			  		}}
			  	/>
					<MenuItem
			  		title="Save playlist"
			  		status={props.upnext.length ? '' : 'disabled'}
			  		handler={e => {
			  			$('#tabs a[href="#playlists"]').tab('show');
			  			props.onSaveList(props.upnext, props.currentTrack);
			  			e.preventDefault(); 
			  		}}
			  	/>
			  	<li role="separator" className="divider"></li>
			  	<li className="dropdown-submenu">
				    <a className="dropdown-item" href="#">Playmode</a>
						<ul className="dropdown-menu dropdown-menu-right">
							<MenuItem
					  		title="Repeat"
					  		status={props.playMode === playmode.REPEAT ? 'selected' : ''}
					  		handler={e => {
					  			props.playMode === playmode.REPEAT ? props.changePlaymode(playmode.NORMAL) : props.changePlaymode(playmode.REPEAT);
			  					e.preventDefault(); 
					  		}}
					  	/>
							<MenuItem
					  		title="Repeat 1"
					  		status={props.playMode === playmode.REPEAT1 ? 'selected' : ''}
					  		handler={e => { 
					  			props.playMode === playmode.REPEAT1 ? props.changePlaymode(playmode.NORMAL) : props.changePlaymode(playmode.REPEAT1);
			  					e.preventDefault();
					  		}}
					  	/>
					  	<MenuItem
					  		title="Shuffle"
					  		status={props.playMode === playmode.SHUFFLE ? 'selected' : ''}
					  		handler={e => { 
					  			props.playMode === playmode.SHUFFLE ? props.changePlaymode(playmode.NORMAL) : props.changePlaymode(playmode.SHUFFLE);
			  					e.preventDefault(); 
					  		}}
					  	/>
	  				</ul>
	  			</li>
			  	<li role="separator" className="divider"></li>
			  	<li><a className="dropdown-item" href="#">Cast...</a></li>
			  	<li role="separator" className="divider"></li>
			  	<li className="dropdown-submenu">
				    <a className="dropdown-item" href="#">View</a>
						<ul className="dropdown-menu dropdown-menu-right">
					  	<li><a className="dropdown-item" href="#">Compact</a></li>
					  	<li><a className="dropdown-item" href="#">Night mode</a></li>
					  </ul>
					</li>
			  	<li role="separator" className="divider"></li>
					<li><a className="dropdown-item" href="#">Console</a></li>
			  	<li role="separator" className="divider"></li>
			  	<li><a className="dropdown-item" href="#">Help</a></li>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	playMode: state.playback.nowPlaying.mode,
	currentTrack: state.playback.nowPlaying.track,
	upnext: state.playback.upnext,
	isPlaylists: state.playlists.length
});

export default connect(mapStateToProps, {onImportLib: loadLibrary, onSaveList: saveList, changePlaymode: setPlaymode})(Menu);