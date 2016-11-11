const playlists = (playlists = [], action) => {
	switch (action.type) {
		case 'SAVE_LIST':
			let list = {};
			list[action.name] = action.tracks;
			return [
				...playlists,
				list
			];
		case 'DEL_LIST':
			return [
				...playlists.slice(0, action.index),
				...playlists.slice(action.index + 1)
			];
		default:
			return playlists;
	}
}

export default playlists