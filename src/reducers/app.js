const app = (
	app = {
		tableW: 0,
		colsW: 0,
		tableHds: ['Artist', 'Duration', 'Album', 'Track', 'Title'],
		serverUrl: ''		
	}, action) => {
	switch(action.type) {
		case 'SET_SERVER_ADDR':
			return {...app,
				serverUrl: action.url
			}
		case 'SET_TABLE':
			return {...app, 
				tableW: action.width
			}
		case 'SET_COLS':
			return {...app, 
				colsW: action.width
			}
		default:
			return app;
	}
}

export default app;