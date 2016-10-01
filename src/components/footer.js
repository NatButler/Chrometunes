import React from 'react';

const Footer = ({store, state}) => {
	return (
		<footer className="footer" id="footer">
			<div className="container">
                <audio 
                	controls 
                	id="player" 
                	onEnded={() => {
                		store.dispatch({
                			type: 'SKIP_TRACK'
                		});
                	}}
                >
                	<AudioSource track={state.upnext[0]} />
                </audio>
            </div>
		</footer>
	);
}

const AudioSource = ({track}) => {
	let loc, type;
	if (track) { loc = track.Location, type = track.Type; }
	return <source src={loc} type={type} />
}

export default Footer