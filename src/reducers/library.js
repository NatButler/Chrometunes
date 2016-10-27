const library = (
	library = {
		id: '',
		tracks: [],
		genres: [],
		search: [],
		filter: ''
	}, action) => {
	switch (action.type) {
		case 'IMPORT_LIB':
			return Object.assign({}, library, {
				id: action.id,
				tracks: action.tracks,
				genres: action.genres
			});
		case 'SEARCH_LIB':
			return Object.assign({}, library, {
				search: action.results
			});
		case 'SET_FILTER':
			return Object.assign({}, library, {
				filter: action.filter
			});
		default:
			return library;
	}
}

export default library