import { getAlbum, getArtist, getGenre } from '../library';


// LIBRARY
export const filterLib = (results = []) => {
	return {
		type: 'SEARCH_LIB',
		results
	}
}

export const filterArtist = (artist) => {
	return {
		type: 'SEARCH_LIB',
		results: getArtist(artist)
	}
}

export const filterAlbum = (album) => {
	return {
		type: 'SEARCH_LIB',
		results: getAlbum(album)
	}
}

export const filterGenre = (genre) => {
	return {
		type: 'SEARCH_LIB',
		results: getGenre(genre)
	}
}


// UP NEXT
export const addTrack = (track) => {
	return {
		type: 'ADD_TRACK',
		track
	}
}

export const addAlbum = (album) => {
	return {
		type: 'ADD_ALBUM',
		album: getAlbum(album)
	}
}

export const addRemAlbum = (track) => {
	return {
		type: 'ADD_REM_ALBUM',
		album: getAlbum(track.Album),
		index: track.TrackNum
	}
}

export const delTrack = (index) => {
	return {
		type: 'DEL_TRACK',
		index
	}
}

export const skipTrack = (playmode) => {
	return {
		type: 'SKIP_TRACK',
		playmode
	}
}


// PLAYBACK
export const playTrack = (playmode, track) => {
	switch (playmode) {
		case 'normal':
			return {
				type: 'CURRENT_TRACK',
				track: track
			}
		case 'repeat':
			return {

			}
		case 'random':
			return {

			}
		default:
			return {

			}
	}
}

export const pauseTrack = () => {
	return {
		type: 'TOGGLE_PLAYBACK'
	}
}


// PLAYLISTS
export const saveList = (upnext) => {
	let listName = prompt('Enter playlist name.');
	return {
		type: 'SAVE_LIST',
		name: listName,
		tracks: upnext
	}
}

export const loadPlaylist = (tracks) => {
	return {
		type: 'LOAD_PLAYLIST',
		tracks
	}
}

export const delPlaylist = (index) => {
	return {
		type: 'DEL_LIST',
		index
	}
}