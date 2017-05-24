const library = (
	library = {
		id: '',
		dir: '',
		mediaDir: '',
		tracks: [],
		genres: [],
		search: [],
		query: '',
		filtered: [],
		filter: '',
		filterType: ''
	}, action) => {
	switch (action.type) {
		case 'IMPORT_LIB':
			return {...library, 
				id: action.id,
				dir: action.dir,
				mediaDir: action.mediaDir,
				tracks: action.tracks, 
				genres: action.genres,
				filter: action.filter,
				filterType: action.filterType,
				filtered: action.filtered,
				query: action.query,
				search: action.search
			}
		case 'SEARCH_LIB':
			return {...library,
				search: action.results,
				query: action.query
			}
		case 'FILTER_LIB':
			return {...library,
				filtered: action.results,
				filter: action.filter,
				filterType: action.filterType
			}
		case 'CLEAR_SEARCH':
			return {...library,
				search: [],
				query: ''
			}
		case 'CLEAR_FILTERED':
			return {...library,
				filtered: [],
				filter: ''
			}
		default:
			return library;
	}
}

export default library;