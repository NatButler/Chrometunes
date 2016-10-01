import { combineReducers } from 'redux';
import library from './library';
import upnext from './upnext';
import playlists from './playlists';
import playback from './playback';
import playmode from './playmode';


const mediaApp = combineReducers({
	library: library,
	upnext: upnext,
	playlists: playlists,
	playback: playback,
	playmode: playmode
});

export default mediaApp