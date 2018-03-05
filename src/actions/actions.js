import { v4 } from 'uuid';
import { fetchLibrary } from '../libraryFetch';
import { loadState } from '../localStorage';
import getIP from '../getIP';
import { trkFilter, getArtistAlbs } from '../librarySearch';
import * as aT from '../constants/actionTypes';
import * as fT from '../constants/filterTypes';
import * as pM from '../constants/playModes';

// APP
const setServerUrl = ip => ({
	type: aT.SET_SERVER_ADDR, 
	addr: 'http://' + ip + ':8080/'
});
export const setCastStatus = status => ({
	type: aT.SET_CAST_STATUS, status
});
export const setInfobarPos = pos => ({
	type: aT.SET_INFOBAR_POS, pos
});

// LIBRARY
const importLib = lib => {
	loadState(lib.id);
	return {
		type: aT.IMPORT_LIB,
		id: lib.id,
		tracks: lib.tracks,
		genres: lib.genres.sort(),
		index: lib.tracks.map(t => t.PId),
		alert: ''
	}
};
export const libAlert = msg => ({
	type: aT.LIB_ALERT, msg
});
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
export const dndTrackUp = (currIdx, destIdx) => ({
	type: aT.DND_TRACK_UP,
	currIdx: currIdx,
	destIdx: destIdx
});
export const dndTrackDown = (currIdx, destIdx) => ({
	type: aT.DND_TRACK_DOWN,
	currIdx: currIdx,
	destIdx: destIdx
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
		case pM.SHUFFLE:
			return {
				type: aT.PLAY_TRACK,
				mode: mode,
				track: lib[index.indexOf(upnext[randomTrack(upnext.length)])]
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
export const delPlaylist = id => ({ 
	type: aT.DEL_LIST, id
});

// ASYNC
export const loadLibrary = () => 
	fetchLibrary().then(lib => 
		importLib(lib)
	).catch(reason => 
		libAlert(reason)
	);
export const loadPlaylists = libId =>
	loadState(libId).then(state =>
		importPlaylists(state.playlists)
	);
export const obtainIP = () =>
	getIP().then(ip =>
		setServerUrl(ip)
	).catch(err => 
		libAlert(err)
	);

// UTILS
const randomTrack = len => {
	return Math.floor(Math.random() * len);
}