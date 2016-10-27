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
		case 'LOAD_PLAYLIST':
			return [
				...action.tracks
			];
		case 'DEL_TRACK':
			return [
				...upnext.slice(0, action.index),
				...upnext.slice(action.index + 1)
			];
		case 'CLEAR_TRACKS':
			return [];
		case 'SKIP_TRACK':
			switch (action.playmode) {
				case 'normal':
					return upnext.slice(1);
				case 'repeat':
					return [
						...upnext.slice(1),
						...upnext.slice(0, 1)
					];
				case 'random':
					return upnext;
				default:
					return upnext;
			}
		default:
			return upnext;
	}
}

export default upnext