import { trkFilter } from '../librarySearch';
import * as types from '../constants/actionTypes';
import * as filterTypes from '../constants/filterTypes';
import * as playmodes from '../constants/playModes';

// APP
export const setServerUrl = url => ({
	type: types.SET_SERVER_ADDR, url
});
export const setCastStatus = status => ({
	type: types.SET_CAST_STATUS, status
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
	genres: lib.genres
});
export const searchLib = (results, query) => ({ 
	type: types.SEARCH_LIB, 
	results: results, 
	query: query 
});
export const filterLib = (tracks, filter, filterType = filterTypes.GENRE) => ({ 
	type: types.FILTER_LIB,
	results: trkFilter(tracks, filter, filterType),
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
export const addAlbum = (track, tracks) => ({
	type: types.ADD_ALBUM,
	album: trkFilter(tracks, track, filterTypes.ALBUM)
});
export const addRemAlbum = (track, tracks) => ({
	type: types.ADD_REM_ALBUM,
	album: trkFilter(tracks, track, filterTypes.ALBUM),
	index: track.Track-1
});
export const playFrom = (trk, trackIdx) => ({
	type: types.PLAY_FROM,
	track: trk,
	index: trackIdx + 1
});
export const delTrack = index => ({ 
	type: types.DEL_TRACK, index 
});
export const clearTracks = () => ({ 
	type: types.CLEAR_TRACKS 
});

// PLAYBACK
export const playTrack = (playmode, upnext, prevTrack) => {
	if (playmode === playmodes.REPEAT && !prevTrack) {
		playmode = playmodes.NORMAL;
	}

	switch (playmode) {
		case playmodes.NORMAL:
			return {
				type: types.PLAY_TRACK,
				mode: playmode,
				track: upnext[0]
			}
		case playmodes.REPEAT:
			return {
				type: types.PLAY_TRACK,
				mode: playmode,
				track: upnext[0],
				prevTrack: prevTrack
			}
		case playmodes.REPEAT1: // Not currently necessary as element needs to .load() to play same track again
			return {
				type: types.PLAY_TRACK,
				mode: playmode,
				track: prevTrack
			}
		case playmodes.SHUFFLE:
			return {
				type: types.PLAY_TRACK,
				mode: playmode,
				track: upnext[randomTrack(upnext.length)]
			}
		default:
			return {
				type: types.PLAY_TRACK,
				mode: playmode,
				track: upnext[0]
			}
	}
}
export const setPlayback = state => ({ 
	type: types.SET_PLAYBACK_STATE, state 
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
	let list = {};
	list[title] = (currentTrack) ? [currentTrack, ...upnext] : upnext;
	return {
		type: types.SAVE_LIST,
		list: list
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