import * as pM from '../constants/playModes';

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
		case 'ADD_REM_DISC':
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
		case 'DND_TRACK_UP':
			return [
				...upnext.slice(0, action.destIdx), 
				upnext[action.currIdx], 
				...upnext.slice(action.destIdx, action.currIdx), 
				...upnext.slice(action.currIdx+1) 
			];
		case 'DND_TRACK_DOWN':
			return [
				...upnext.slice(0, action.currIdx), 
				...upnext.slice(action.currIdx+1, action.destIdx+1), 
				upnext[action.currIdx],
				...upnext.slice(action.destIdx+1)
			];
		case 'CLEAR_TRACKS':
			return [];
		case 'PLAY_TRACK':
			switch (action.mode) {
				case pM.NORMAL:
					return upnext.slice(1);
				case pM.REPEAT:
					return [
						...upnext.slice(1),
						action.prevTrack
					];
				default:
					return upnext;
			}
		case 'LOAD_LIST':
			return [
				...action.list
			];
		default:
			return upnext;
	}
}

export default upnext;