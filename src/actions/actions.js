import { v4 } from 'uuid';
import { fetchLibrary } from '../libraryFetch';
import { loadState } from '../localStorage';
import { trkFilter, getArtistAlbs } from '../librarySearch';
import * as aT from '../constants/actionTypes';
import * as fT from '../constants/filterTypes';
import * as pM from '../constants/playModes';

// APP
export const setServerUrl = url => ({
	type: aT.SET_SERVER_ADDR, url
});
export const setCastStatus = status => ({
	type: aT.SET_CAST_STATUS, status
});

// LIBRARY
const importLib = lib => {
	loadState(lib.id);
	return {
		type: aT.IMPORT_LIB,
		id: lib.id,
		tracks: lib.tracks, 
		genres: lib.genres,
		index: lib.tracks.map(t => t.PId)
	}
};
export const query = query => ({
	type: aT.QUERY, query
});
export const searchLib = tracks => ({ 
	type: aT.SEARCH_LIB, tracks
});
export const filterLib = (tracks, filter, type = fT.GENRE) => ({ 
	type: aT.FILTER_LIB,
	results: (type === fT.ARTIST) ? getArtistAlbs(tracks, filter, type) : trkFilter(tracks, filter, type),
	filter: (typeof(filter) === 'object') ? filter[type] : filter,
	filterType: type
});
export const clearSearch = () => ({ 
	type: aT.CLEAR_SEARCH 
});
export const clearFiltered = () => ({ 
	type: aT.CLEAR_FILTERED 
});

// UP NEXT
export const addTrack = track => ({ 
	type: aT.ADD_TRACK, track
});
export const addDisc = (track, tracks) => ({
	type: aT.ADD_ALBUM,
	album: trkFilter(tracks, track, fT.ALBUM, track.Disc).map(t => t.PId)
});
export const addRemDisc = (track, tracks) => ({
	type: aT.ADD_REM_DISC,
	album: trkFilter(tracks, track, fT.ALBUM, track.Disc).map(t => t.PId),
	index: track.Track
});
export const playFrom = (trk, trackIdx) => ({
	type: aT.PLAY_FROM,
	track: trk,
	index: trackIdx + 1
});
export const delTrack = index => ({ 
	type: aT.DEL_TRACK, index 
});
export const clearTracks = () => ({
	type: aT.CLEAR_TRACKS 
});
export const loadPlaylist = list => ({ 
	type: aT.LOAD_LIST, list
});

// PLAYBACK
export const playTrack = (lib, index, mode, upnext, prevTrk) => {
	if (mode === pM.REPEAT && !prevTrk) {
		mode = pM.NORMAL;
	}
	else if (mode === pM.SHUFFLE) {
		mode = pM.REPEAT1;
	}

	switch (mode) {
		case pM.NORMAL:
			return {
				type: aT.PLAY_TRACK,
				mode: mode,
				track: lib[index.indexOf(upnext[0])]
			}
		case pM.REPEAT:
			return {
				type: aT.PLAY_TRACK,
				mode: mode,
				track: lib[index.indexOf(upnext[0])],
				prevTrack: prevTrk
			}
		// Not currently necessary as element needs to .load() to play same track again
		case pM.REPEAT1: 
			return {
				type: aT.PLAY_TRACK,
				mode: mode,
				track: prevTrk
			}
		case pM.SHUFFLE:
			return {
				type: aT.PLAY_TRACK,
				mode: mode,
				track: upnext[randomTrack(upnext.length)]
			}
		default:
			return {
				type: aT.PLAY_TRACK,
				mode: mode,
				track: lib[index.indexOf(upnext[0])]
			}
	}
}
export const setPlayback = state => ({ 
	type: aT.SET_PLAYBACK_STATE, state 
});
export const togglePlayback = () => ({ 
	type: aT.TOGGLE_PLAYBACK_STATE
});
export const setPlaymode = mode => ({
	type: aT.SET_PLAYMODE, mode
});
export const togglePlaymode = () => ({
	type: aT.TOGGLE_PLAYMODE
});

// PLAYLISTS
const importPlaylists = lists => ({
	type: aT.IMPORT_PLAYLISTS,
	lists: lists
});
export const saveList = (upnext, currentTrack) => ({
	type: aT.SAVE_LIST,
	id: v4(),
	tracks: currentTrack ? [currentTrack['PId'], ...upnext] : upnext
});
export const namePlaylist = (id, title = 'Untitled') => ({
	type: aT.NAME_LIST,
	id: id,
	title: title
});
export const delPlaylist = idx => ({ 
	type: aT.DEL_LIST, idx
});

// ASYNC
export const loadLibrary = () => 
	fetchLibrary().then(lib => 
		importLib(lib)
	);

export const loadPlaylists = libId =>
	loadState(libId).then(lists =>
		importPlaylists(lists)
	);

export const getIP = () => {
		// getIP().then(addr => { server = 'http://' + addr + ':8080/'; });
}

// UTILS
const randomTrack = len => {
	return Math.floor(Math.random() * len);
}