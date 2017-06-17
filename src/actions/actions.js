import { v4 } from 'uuid';
import { trkFilter, getArtistAlbs } from '../librarySearch';
import * as types from '../constants/actionTypes';
import * as fT from '../constants/filterTypes';
import * as playmode from '../constants/playModes';

// APP
export const setServerUrl = url => ({
	type: types.SET_SERVER_ADDR, url
});
export const setCastStatus = status => ({
	type: types.SET_CAST_STATUS, status
});

// LIBRARY
export const importLib = lib => ({
	type: types.IMPORT_LIB,
	id: lib.id,
	tracks: lib.tracks, 
	genres: lib.genres,
	index: lib.tracks.map(t => t.PId)
});
export const query = query => ({
	type: types.QUERY, query
});
export const searchLib = tracks => ({ 
	type: types.SEARCH_LIB, tracks
});
export const filterLib = (tracks, filter, type = fT.GENRE) => ({ 
	type: types.FILTER_LIB,
	results: (type === fT.ARTIST) ? getArtistAlbs(tracks, filter, type) : trkFilter(tracks, filter, type),
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
	album: trkFilter(tracks, track, fT.ALBUM, track.Disc).map(t => t.PId)
});
export const addRemDisc = (track, tracks) => ({
	type: types.ADD_REM_DISC,
	album: trkFilter(tracks, track, fT.ALBUM, track.Disc).map(t => t.PId),
	index: track.Track
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
export const loadPlaylist = list => ({ 
	type: types.LOAD_LIST, list
});

// PLAYBACK
export const playTrack = (lib, index, mode, upnext, prevTrk) => {
	if (mode === playmode.REPEAT && !prevTrk) {
		mode = playmode.NORMAL;
	}
	else if (mode === playmode.SHUFFLE) {
		mode = playmode.REPEAT1;
	}

	switch (mode) {
		case playmode.NORMAL:
			return {
				type: types.PLAY_TRACK,
				mode: mode,
				track: lib[index.indexOf(upnext[0])]
			}
		case playmode.REPEAT:
			return {
				type: types.PLAY_TRACK,
				mode: mode,
				track: lib[index.indexOf(upnext[0])],
				prevTrack: prevTrk
			}
		case playmode.REPEAT1: // Not currently necessary as element needs to .load() to play same track again
			return {
				type: types.PLAY_TRACK,
				mode: mode,
				track: prevTrk
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
				track: lib[index.indexOf(upnext[0])]
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
export const saveList = (upnext, currentTrack) => ({
	type: types.SAVE_LIST,
	id: v4(),
	tracks: currentTrack ? [currentTrack['PId'], ...upnext] : upnext
});
export const namePlaylist = (id, title = 'Untitled') => ({
	type: types.NAME_LIST,
	id: id,
	title: title
});
export const delPlaylist = idx => ({ 
	type: types.DEL_LIST, idx
});

// UTILS
const randomTrack = len => {
	return Math.floor(Math.random() * len);
}