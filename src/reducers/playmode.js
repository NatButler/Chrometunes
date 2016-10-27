const playmode = (playmode = 'normal', action) => {
	switch (action.type) {
		case 'SET_PLAYMODE':
			if (playmode == 'normal') { return playmode = 'repeat'; }
			else if (playmode == 'repeat') { return playmode = 'refresh'; }
			else if (playmode == 'refresh') { return playmode = 'random'; }
			else { return playmode = 'normal'; }
		default:
			return playmode;
	}
}

export default playmode