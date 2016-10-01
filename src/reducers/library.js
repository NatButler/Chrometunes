const library = (
	library = {
		id: '',
		tracks: [],
		genres: [],
		search: []
	}, action) => {
	switch (action.type) {
		case 'IMPORT_LIB':
			return Object.assign({}, library, {
				id: action.id,
				tracks: action.tracks,
				genres: action.genres
			});
		case 'FILTER_LIB':
			return Object.assign({}, library, {
				search: action.results
			});
		default:
			return library;
	}
}

export default library