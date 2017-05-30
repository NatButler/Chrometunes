<<<<<<< HEAD
import { trkFilter, sortByTrackNo, sortResults } from '../librarySearch';
import * as types from '../constants/actionTypes';
import * as filters from '../constants/filters';
import * as playmodes from '../constants/playModes';

// APP
export const setServerUrl = url => ({
	type: types.SET_SERVER_ADDR, url
});
export const setTableWidth = width => ({
	type: types.SET_TABLE, width
});
export const setColWidth = width => ({
	type: types.SET_COLS, width
});

// LIBRARY
export const importLib = lib => ({
	type: types.IMPORT_LIB,
	id: lib.id,
	dir: lib.dir,
	mediaDir: lib.mediaDir,
	tracks: lib.tracks, 
	genres: lib.genres,
	filter: '',
	filterType: '',
	filtered: [],
	query: '',
	search: []
});
export const searchLib = (results, query) => ({ 
	type: types.SEARCH_LIB, 
	results: results, 
	query: query 
});
export const filterLib = (results, filter, filterType) => ({ 
	type: types.FILTER_LIB,
	results: results,
	filter: filter,
	filterType: filterType
});
export const clearSearch = () => ({ 
	type: types.CLEAR_SEARCH 
});
export const clearFiltered = () => ({ 
	type: types.CLEAR_FILTERED 
});

// UP NEXT
export const addTrack = track => ({ 
	type: types.ADD_TRACK, track 
});
export const addAlbum = (album, tracks) => ({
	type: types.ADD_ALBUM,
	album: sortByTrackNo( trkFilter(album, filters.ALBUM, tracks) )
});
export const addRemAlbum = (track, tracks) => ({
	type: types.ADD_REM_ALBUM,
	album: sortByTrackNo( trkFilter(track.Album, filters.ALBUM, tracks) ),
	index: track.Track
});
export const playFrom = trackIdx => ({
	type: types.PLAY_FROM,
	index: trackIdx + 1
});
export const delTrack = index => ({ 
	type: types.DEL_TRACK, index 
});
export const skipTrack = (playmode, currentTrack) => ({
	type: types.SKIP_TRACK,
	playmode: playmode,
	currentTrack: currentTrack
});
export const clearTracks = () => ({ 
	type: types.CLEAR_TRACKS 
});

// PLAYBACK
export const playTrack = (playmode, upnext, currentTrack) => {
	switch (playmode) {
		case playmodes.NORMAL:
			return {
				type: types.PLAY_TRACK,
				track: upnext[0]
			}
		case playmodes.REPEAT1: // Not currently necessary as element needs to .load() to play same track again
			return {
				type: types.PLAY_TRACK,
				track: currentTrack
			}
		case playmodes.SHUFFLE:
			return {
				type: types.PLAY_TRACK,
				track: upnext[randomTrack(upnext.length)]
			}
		default:
			return {
				type: types.PLAY_TRACK,
				track: upnext[0]
			}
	}
}
export const setPlayback = state => ({ 
	type: types.SET_PLAYBACK, state 
});
export const togglePlayback = () => ({ 
	type: types.TOGGLE_PLAYBACK
});
export const setPlaymode = mode => ({
	type: types.SET_PLAYMODE, mode
});
export const togglePlaymode = () => ({
	type: types.TOGGLE_PLAYMODE
});

// PLAYLISTS
export const saveList = (upnext, currentTrack, title = 'Untitled') => {
	let list = (currentTrack) ? [currentTrack, ...upnext] : upnext;
	return {
		type: types.SAVE_LIST,
		name: title,
		tracks: list
	}
}
export const loadPlaylist = tracks => ({ 
	type: types.LOAD_LIST, tracks 
});
export const delPlaylist = index => ({ 
	type: types.DEL_LIST, index 
});

// UTILS
const randomTrack = len => {
	return Math.floor(Math.random() * len);
}