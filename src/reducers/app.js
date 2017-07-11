const app = (
	app = {
		serverAdd: 'http://localhost:8080/',
		serverStatus: '',
		castStatus: '',
		tableHds: ['Artist', 'Duration', 'Album', 'Track', 'Title'],
		infobarPos: ''
	}, action) => {
	switch(action.type) {
		case 'SET_SERVER_ADDR':
			return {...app,
				serverAdd: action.addr
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
					...app.tableHds,
					action.key
				]
			}
		case 'SET_INFOBAR_POS':
			return {...app,
				infobarPos: action.pos
			}
		default:
			return app;
	}
}

export default app;