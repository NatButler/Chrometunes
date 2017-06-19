const app = (
	app = {
		serverAdd: '',
		serverStatus: '',
		castStatus: '',
		tableHds: ['Artist', 'Duration', 'Album', 'Track', 'Title']
	}, action) => {
	switch(action.type) {
		case 'SET_SERVER_ADDR':
			return {...app,
				serverAdd: action.url
			}
		case 'SET_SERVER_STATUS':
			return {...app,
				serverStatus: action.status
			}
		case 'SET_CAST_STATUS':
			return {...app,
				castStatus: action.status
			}
		case 'SET_VISIBLE_COLUMNS':
			return {...app,
				tableHds: [
					...tableHds,
					action.key
				]
			}
		default:
			return app;
	}
}

export default app;