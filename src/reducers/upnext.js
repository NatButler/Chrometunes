import * as playmode from '../constants/playModes';

const upnext = (upnext = [], action) => {
	switch (action.type) {
		case 'ADD_TRACK':
			return [
				...upnext,
				action.track
			];
		case 'ADD_ALBUM':
			return [
				...upnext,
				...action.album
			];
		case 'ADD_REM_ALBUM':
			return [
				...action.album.slice(action.index)
			];
		case 'PLAY_FROM':
			return [
				...upnext.slice(action.index)
			];
		case 'DEL_TRACK':
			return [
				...upnext.slice(0, action.index),
				...upnext.slice(action.index + 1)
			];
		case 'CLEAR_TRACKS':
			return [];
		case 'PLAY_TRACK':
			switch (action.mode) {
				case playmode.NORMAL:
					return upnext.slice(1);
				case playmode.REPEAT:
					return [
						...upnext.slice(1),
						action.prevTrack
					];
				default:
					return upnext;
			}
		case 'LOAD_LIST':
			return [
				...action.tracks
			];
		default:
			return upnext;
	}
}

export default upnext;