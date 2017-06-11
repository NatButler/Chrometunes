const app = (
	app = {
		dimentions: {
			tableW: 0,
			colsW: 0
		},
		tableHds: ['Artist', 'Duration', 'Album', 'Track', 'Title'],
		serverAdd: '',
		serverStatus: '',
		castStatus: ''
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