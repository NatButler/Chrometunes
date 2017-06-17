import { sortLibrary } from './librarySearch';

const parseXML = xml => {
	return new Promise( (resolve, reject) => {
		if (!xml.getElementsByTagName('dict')[0]) { reject('Failed to read XML file.'); }

		xml = xml.getElementsByTagName('dict')[0];
		const tracksNode = xml.getElementsByTagName('dict')[0].childNodes;
		const lib = {
			id: xml.getElementsByTagName('string')[1].textContent,
			tracks: [],
			genres: []
		};

		let artists = [];
		let currentArtist = '';
		let currentGenre = '';

		// Iterates tracks
		for (let i = 3, len = tracksNode.length; i < len; i = i + 4) {
			const trackNodes = tracksNode[i].childNodes;
			const trk = {
				Title: '',
				Artist: '',
				Album: '',
				Artwork: 0,
				Genre: 'Unknown'
			};

			// For each track, return new test and remove keys as they are found

			// Iterates keys/props of track
			for (let j = 3, lnth = trackNodes.length; j < lnth; j = j + 3) {
				const trackNode = trackNodes[j].nextSibling;

				if (trackNode === null) { break; } // Only needs to check for null on last iteration
				const key = trackNode.textContent;
				const prop = trackNode.nextSibling.textContent;

				if (key === 'Total Time') 		{ trk['Duration'] 	= calcDuration(prop); }
				if (key === 'Disc Number') 		{ trk['Disc'] 			= +prop; }
				if (key === 'Disc Count') 		{ trk[key] 					= +prop; }
				if (key === 'Track Number') 	{ trk['Track'] 			= +prop; }
				if (key === 'Track Count') 		{	trk['TrackCount'] = +prop; }
				if (key === 'Year') 					{ trk[key]			 		= prop; }
				if (key === 'Bit Rate') 			{ trk[key]				 	= prop; }
				if (key === 'Sample Rate')		{	trk[key]					= prop; }
				if (key === 'Artwork Count') 	{	trk['Artwork']		= +prop; }
				if (key === 'Persistent ID') 	{ trk['PId'] 				= prop; }
				if (key === 'Name') 					{ trk['Title'] 			= prop; }
				if (key === 'Artist') 				{ trk[key]		 			= prop; }
				if (key === 'Album') 					{ trk[key]	 				= prop; }
				if (key === 'Genre') 					{	trk[key]		 			= prop; }
				if (key === 'Kind') 					{ trk['Type'] 			= getMimeType(prop); }
				if (key === 'Comments') 			{ trk[key]					= prop; }
				if (key === 'Location') 			{ trk[key]			 		= getLoc(prop); }
			}

			if ( trk.Artist !== currentArtist ) {
				currentArtist = trk.Artist;
				if ( !artists.includes(trk.Artist) ) { artists.push(trk.Artist); }
			}
			if ( trk.Genre !== currentGenre ) {
				currentGenre = trk.Genre;
				if ( !lib.genres.includes(trk.Genre) ) { lib.genres.push(trk.Genre); }
			}
			if ( trk.Location ) { lib.tracks.push(trk); }
		}

		lib.genres.sort();
		artists.sort();
		lib.tracks = sortLibrary(lib.tracks, artists);

		resolve(lib);
	});
}

const calcDuration = totalTime => {
	let hr = '';
	let totalSec = totalTime.slice(0, -3);
	let totalMin = totalSec / 60;
	let min = totalMin | 0;
	let sec = Math.round( (totalMin-min) * 60 ).toString();

	if (totalMin > 60) {
		let totalHr = (min / 60) | 0;
		hr = totalHr + ':';
		min = (totalMin | 0) - 60;
		if (min === 0) { min = '00'; }
	}

	if (sec.length === 1) { sec = '0' + sec; }
	return hr + min + ':' + sec;
}

const getMimeType = type => {
	switch(type) {
		case 'MPEG audio file':
			return 'audio/mp3';
		case 'AAC audio file':
			return 'audio/m4a';
		case 'WAV audio file':
			return 'audio/wav';
	}
}

const getLoc = loc => '..' + loc.substr( loc.indexOf('c/') + 1, loc.length );

export default parseXML;