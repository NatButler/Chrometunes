import { getAlbum, getArtist, getGenre, trkFilter } from '../library';
import * as types from '../constants/actionTypes';
import * as filters from '../constants/filters';


// LIBRARY
export const searchLib = (results, query) => ({ 
	type: types.SEARCH_LIB, 
	results: results, 
	query: query 
});
export const filterLib = (results, filter) => ({ 
	type: types.FILTER_LIB,
	results: results,
	filter: filter
});
export const clearSearch = () => ({ type: types.CLEAR_SEARCH });
export const clearFiltered = () => ({ type: types.CLEAR_FILTERED });


// UP NEXT
export const addTrack = (track) => ({ type: types.ADD_TRACK, track });
export const addAlbum = (album) => ({
	type: types.ADD_ALBUM,
	album: trkFilter(album, filters.ALBUM)
});
export const addRemAlbum = (track) => ({
	type: types.ADD_REM_ALBUM,
	album: trkFilter(track.Album, filters.ALBUM),
	index: track.TrackNum
});
export const playFrom = (trackIdx) => ({
	type: types.PLAY_FROM,
	index: trackIdx + 1
});
export const delTrack = (index) => ({ type: types.DEL_TRACK, index });
export const skipTrack = (playmode, currentTrack) => ({
	type: types.SKIP_TRACK,
	playmode: playmode,
	currentTrack: currentTrack
});
export const clearTracks = () => ({ type: types.CLEAR_TRACKS });


// PLAYBACK
export const playTrack = (playmode, upnext, currentTrack) => {
	switch (playmode) {
		case 'normal':
			return {
				type: types.PLAY_TRACK,
				track: upnext[0]
			}
		case 'refresh': // Not currently necessary as element needs to .load() to play same track again
			return {
				type: types.PLAY_TRACK,
				track: currentTrack
			}
		case 'random':
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
export const togglePlayback = () => ({ type: types.TOGGLE_PLAYBACK });
export const setPlayback = (state) => ({ type: types.SET_PLAYBACK, state });
export const setPlaymode = () => ({ type: types.SET_PLAYMODE });


// PLAYLISTS
export const saveList = (upnext, currentTrack) => {
	let listName = prompt('Enter playlist name.'),
		list = (currentTrack) ? [currentTrack, ...upnext] : upnext;

	return {
		type: types.SAVE_LIST,
		name: listName,
		tracks: list
	}
}
export const loadPlaylist = (tracks) => ({ type: types.LOAD_LIST, tracks });
export const delPlaylist = (index) => ({ type: types.DEL_LIST, index });


// UTILS
const randomTrack = (len) => {
	return Math.floor(Math.random() * len);
}