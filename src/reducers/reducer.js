import { combineReducers } from 'redux';
import library from './library';
import upnext from './upnext';
import playlists from './playlists';
import playback from './playback';
import app from './app';

const mediaApp = combineReducers({
	app: app,
	library: library,
	playback: playback,
	playlists: playlists,
	upnext: upnext
});

export default mediaApp;