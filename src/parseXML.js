import { sortLibrary } from './librarySearch';

const parseXML = xml => {
	return new Promise( (resolve, reject) => {
		xml = xml.getElementsByTagName('dict')[0] || reject('Failed to read XML file.');
		const tracksNode = xml.getElementsByTagName('dict')[0].childNodes;
		const lib = {
			id: xml.getElementsByTagName('string')[1].textContent,
			tracks: [],
			genres: []
		};

		const artists = [];
		let artist = '';
		let genre = '';

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
			const keyMap = new Map ([
				['Total Time', 		(key, prop) => { trk['Duration'] 		= getDur(prop); }],
				['Disc Number', 	(key, prop) => { trk['Disc'] 				= +prop; }],
				['Disc Count', 		(key, prop) => { trk[key] 					= +prop; }],
				['Track Number', 	(key, prop) => { trk['Track'] 			= +prop; }],
				['Track Count', 	(key, prop) => { trk['TrackCount'] 	= +prop; }],
				['Year', 					(key, prop) => { trk[key]			 			= prop; }],
				['Bit Rate', 			(key, prop) => { trk[key]			 			= prop; }],
				['Sample Rate',		(key, prop) => { trk[key]						= prop; }],
				['Artwork Count', (key, prop) => { trk['Artwork']			= +prop; }],
				['Persistent ID',	(key, prop) => { trk['PId'] 				= prop; }],
				['Name', 					(key, prop) => { trk['Title'] 			= prop; }],
				['Artist', 				(key, prop) => { trk[key]		 				= prop; }],
				['Album', 				(key, prop) => { trk[key]	 					= prop; }],
				['Genre', 				(key, prop) => { trk[key]		 				= prop; }],
				['Kind', 					(key, prop) => { trk['Type']				= getMime(prop); }],
				['Comments', 			(key, prop) => { trk[key]						= prop; }],
				['Location', 			(key, prop) => { trk[key]		 				= getLoc(prop); }]
			]);

			let it = 6;
			keyMap.forEach((func, mapKey) => {
				for (let j = it, lnth = trackNodes.length - 1; j < lnth; j = j + 3) {
					const trackNode = trackNodes[j].nextSibling;
					const key = trackNode.textContent;
					if (mapKey === key) {
						func(key, trackNode.nextSibling.textContent);
						it = j + 3;
						break; 
					} 
				}
			});

			if ( trk.Artist !== artist ) {
				artist = trk.Artist;
				if ( !artists.includes(trk.Artist) ) { artists.push(trk.Artist); }
			}
			if ( trk.Genre !== genre ) {
				genre = trk.Genre;
				if ( !lib.genres.includes(trk.Genre) ) { lib.genres.push(trk.Genre); }
			}
			if ( trk.Location ) { lib.tracks.push(trk); }
		}

		artists.sort();
		lib.tracks = sortLibrary(lib.tracks, artists);

		resolve(lib);
	});
}

const getDur = totalTime => {
	let hr = '';
	const totalSec = totalTime.slice(0, -3);
	const totalMin = totalSec / 60;
	let min = totalMin | 0;
	let sec = Math.round( (totalMin-min) * 60 ).toString();

	if (totalMin > 60) {
		const totalHr = (min / 60) | 0;
		hr = totalHr + ':';
		min = (totalMin | 0) - 60;
		if (min === 0) { min = '00'; }
	}

	if (sec.length === 1) { sec = '0' + sec; }
	return hr + min + ':' + sec;
}

const getMime = type => {
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