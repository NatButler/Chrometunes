const library = (
	library = {
		id: '',
		query: '',
		search: [],
		filtered: [],
		filter: ''
	}, action) => {
	switch (action.type) {
		case 'IMPORT_LIB':
			return Object.assign({}, library, {
				id: action.id,
			});
		case 'SET_QUERY':
			return Object.assign({}, library, {
				query: action.query
			});
		case 'SEARCH_LIB':
			return Object.assign({}, library, {
				search: action.results
			});
		case 'FILTER_LIB':
			return Object.assign({}, library, {
				filtered: action.results
			});
		case 'SET_FILTER':
			return Object.assign({}, library, {
				filter: action.filter
			});
		case 'CLEAR_SEARCH':
			return Object.assign({}, library, {
				search: [],
				filter: [],
				query: ''
			});
		default:
			return library;
	}
}

export default library