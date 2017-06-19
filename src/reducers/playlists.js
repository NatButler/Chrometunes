const playlists = (playlists = [], action) => {
	switch (action.type) {
		case 'IMPORT_PLAYLISTS':
			console.log('Importing playlists.');
			return [
				...playlists,
				...action.lists
			];
		case 'SAVE_LIST':
			return [
				...playlists,
				playlist(undefined, action)
			];
		case 'NAME_LIST':
			return playlists.map(l => playlist(l, action));
		case 'DEL_LIST':
			return [
				...playlists.slice(0, action.idx),
				...playlists.slice(action.idx + 1)
			];
		default:
			return playlists;
	}
}

const playlist = (list, action) => {
	switch(action.type) {
		case 'SAVE_LIST':
			return {
				id: action.id,
				title: undefined,
				tracks: action.tracks
			}
		case 'NAME_LIST':
			if (list.id !== action.id) {
				return list;
			}

			return {
				...list,
				title: action.title
			}
		default:
			return list
	}
}

export default playlists;