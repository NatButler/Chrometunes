import React from 'react';

const SidePanel = ({store, state}) => {
	return (
		<div className="col-md-3" id="side-panel">
			<ul className="nav nav-pills">
                <li className="active">
                	<a data-toggle="pill" href="#upnext">
                		<span className="glyphicon glyphicon-list"></span>
                	</a>
                </li>
                <li>
                	<a data-toggle="pill" href="#playlists">
                		<span className="glyphicon glyphicon-folder-open"></span>
                	</a>
                </li>
            </ul>
            <UpNext store={store} upnext={state.upnext} />
		</div>
	);
}

const UpNext = ({store, upnext}) => {
	let tracks = upnext.map( (trk, i) => {
		return <UpNextItem key={i} index={i} trk={trk} store={store} />
	});
	return (
	    <div id="up-next" className="tab-pane active">
        	<ul id="up-next-ul">
        		{tracks}
        	</ul>
        	<UpNextControls store={store} />
        </div>
	);
}


const UpNextItem = ({index, trk, store}) => {
	let className = index ? 'up-next-item' : 'up-next-item playing';
	return (
		<li className={className}>
			<span 
				className="glyphicon glyphicon-remove-circle"
				onClick={() => {
					store.dispatch({
						type: 'DEL_TRACK',
						index: index
					})
				}}></span>
			<h5>{trk.Name}</h5>
			<h6>{trk.Artist} | {trk.Album}</h6>
		</li>
	);
}

const UpNextControls = ({store}) => {
	return (
		<footer id="up-next-controls">
		    <button
		    	className="upNext-button enableDisable" 
		    	data-func="save" 
		    	disabled="disabled"
		    >
            	<span className="glyphicon glyphicon-floppy-disk"></span>
            </button>
			<button
				className="upNext-button enableDisable" 
				data-func="clear"
		    	// disabled="disabled"
		    	onClick={() => {
		    		store.dispatch({
		    			type: 'CLEAR_TRACKS'
		    		});
				}}
			>
            	<span className="glyphicon glyphicon-trash"></span>
			</button>
		</footer>
	);
}

/*
Requires mapping of playlists	
*/
const Playlists = ({store, state}) => {
	return (
        <div id="playlists" className="tab-pane">
            <ul id="playlists-ul">
                <Playlist />
            </ul>
        </div>
	);
}

/*
Needs mapping of list
*/
const Playlist = (playlist) => {
	return (
		<li onClick={() => {
			store.dispatch({
				type: 'LOAD_PLAYLIST',
				tracks: []
			});
		}}>
			{playlist.Title}
		</li>
	);
}

export default SidePanel