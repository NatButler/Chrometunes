const library = (
	library = {
		id: '',
		tracks: [],
		genres: [],
		search: [],
		query: '',
		filtered: [],
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
				search: action.results,
				query: action.query
			});
		case 'FILTER_LIB':
			return Object.assign({}, library, {
				filtered: action.results,
				filter: action.filter
			});
		case 'CLEAR_SEARCH':
			return Object.assign({}, library, {
				search: [],
				query: ''
			});
		case 'CLEAR_FILTERED':
			return Object.assign({}, library, {
				filtered: [],
				filter: ''
			});
		default:
			return library;
	}
}

export default library