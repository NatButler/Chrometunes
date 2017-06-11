import { trkFilter, getArtistAlbums } from '../librarySearch';
import * as types from '../constants/actionTypes';
import * as filterType from '../constants/filterTypes';
import * as playmode from '../constants/playModes';

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
	genres: lib.genres,
	artists: lib.artists
});
export const searchLib = (results, query) => ({ 
	type: types.SEARCH_LIB, 
	results: results, 
	query: query 
});
export const filterLib = (tracks, filter, type = filterType.GENRE) => ({ 
	type: types.FILTER_LIB,
	results: (type === filterType.ARTIST) ? getArtistAlbums(tracks, filter, type) : trkFilter(tracks, filter, type),
	filter: (typeof(filter) === 'object') ? filter[type] : filter,
	filterType: type
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
export const addDisc = (track, tracks) => ({
	type: types.ADD_ALBUM,
	album: trkFilter(tracks, track, filterType.ALBUM, track.Disc)
});
export const addRemDisc = (track, tracks) => ({
	type: types.ADD_REM_DISC,
	album: trkFilter(tracks, track, filterType.ALBUM, track.Disc),
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
export const playTrack = (mode, upnext, prevTrack) => {
	if (mode === playmode.REPEAT && !prevTrack) {
		mode = playmode.NORMAL;
	}
	else if (mode === playmode.SHUFFLE && !upnext) {
		mode = playmode.REPEAT1;
	}

	switch (mode) {
		case playmode.NORMAL:
			return {
				type: types.PLAY_TRACK,
				mode: mode,
				track: upnext[0]
			}
		case playmode.REPEAT:
			return {
				type: types.PLAY_TRACK,
				mode: mode,
				track: upnext[0],
				prevTrack: prevTrack
			}
		case playmode.REPEAT1: // Not currently necessary as element needs to .load() to play same track again
			return {
				type: types.PLAY_TRACK,
				mode: mode,
				track: prevTrack
			}
		case playmode.SHUFFLE:
			return {
				type: types.PLAY_TRACK,
				mode: mode,
				track: upnext[randomTrack(upnext.length)]
			}
		default:
			return {
				type: types.PLAY_TRACK,
				mode: mode,
				track: upnext[0]
			}
	}
}
export const setPlayback = state => ({ 
	type: types.SET_PLAYBACK_STATE, state 
});
export const togglePlayback = () => ({ 
	type: types.TOGGLE_PLAYBACK_STATE
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