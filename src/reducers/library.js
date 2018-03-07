// import * as fT from '../constants/filterTypes';

const library = (
	library = {
		id: '',
		tracks: [],
		index: [],
		genres: [],
		query: '',
		search: [],
		searchGenres: [],
		filter: '',
		filtered: [],
		filterType: '',
		alert: ''
	}, action) => {
	switch (action.type) {
		case 'IMPORT_LIB':
			return {...library, 
				id: action.id,
				tracks: action.tracks, 
				genres: action.genres,
				index: action.index,
				alert: ''
			}
		case 'LIB_ALERT':
			return {...library,
				alert: action.msg
			}
		case 'QUERY':
			return {...library,
				query: action.query
			}
		case 'SEARCH_LIB':
			return {...library,
				search: action.tracks,
				searchGenres: action.genres
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
				query: '',
				searchGenres: []
			}
		case 'CLEAR_FILTERED':
			return {...library,
				filtered: [],
				filter: '',
				filterType: ''
			}
		default:
			return library;
	}
}

export default library;