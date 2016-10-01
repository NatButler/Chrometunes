const playmode = (state = 'NORMAL', action) => {
	switch (action.type) {
		case 'SET_PLAYMODE':
			return action.playmode;
			// if (state.playmode == 'NORMAL') { return 'REAPEAT_ALL'; }
			// else if (state.playmode == 'REAPEAT_ALL') { return 'REPEAT_ONE'; }
			// else if (state.playmode == 'REPEAT_ONE') { return 'SHUFFLE'; }
			// else { return 'NORMAL'; }
		default:
			return state;
	}
}

export default playmode