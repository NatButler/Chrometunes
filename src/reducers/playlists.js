const playlists = (playlists = [], action, index) => { // SHOULD BE RETRIEVED FROM LOCAL STORAGE ON PAGE LOAD: SEE EPISODE 2 "Loading initial state"
	switch (action.type) {
		case 'SAVE_LIST':
			return [
				...playlists,
				action.list
			];
		case 'DEL_LIST':
			return [
				...playlist.slice(0, index),
				...playlist.slice(index + 1)
			];
		default:
			return playlists;
	}
}

export default playlists