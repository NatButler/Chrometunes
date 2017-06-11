import { combineReducers } from 'redux';
import library from './library';
import playlists from './playlists';
import playback from './playback';
import app from './app';

const mediaApp = combineReducers({
	app,
	library,
	playback,
	playlists
});

export default mediaApp;