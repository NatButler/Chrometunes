const parseXML = (xml, dir) => {
	return new Promise( (resolve, reject) => {
		xml = xml.getElementsByTagName('dict')[0];
		let tracksNode = xml.getElementsByTagName('dict')[0].childNodes;
		let lib = {
			id: xml.getElementsByTagName('string')[1].textContent,
			dir: dir,
			mediaDir: '',
			tracks: [],
			genres: []
		};

		for (let i = 3, len = tracksNode.length; i < len; i = i + 4) {
			let trackNodes = tracksNode[i].childNodes;
			let trk = {};

			for (let j = 1, lnth = trackNodes.length; j < lnth; j++) {
				let trackNode = trackNodes[j].nextSibling;

				if (trackNodes[j].nodeType !== 1 && trackNode !== null) {
					let key = trackNode.textContent;
					let prop = trackNode.nextSibling.textContent;

					if (key === 'Total Time') { trk['Duration'] = calcDuration(prop); }
					else if (key === 'Disc Count') { trk['DiscCount'] = +prop; }
					else if (key === 'Track Number') { trk['Track'] = +prop; }
					else if (key === 'Track Count') { trk['TrackCount'] = +prop }
					else if (key === 'Persistent ID') { trk['PId'] = prop; }
					else if (key === 'Name') { trk['Title'] = prop; }
					else if (key === 'Artist') { trk['Artist'] = prop; }
					else if (key === 'Album') { trk['Album'] = prop; }
					else if (key === 'Genre') { 
						if ( !lib.genres.includes(prop) ) { lib.genres.push(prop); } 
						trk['Genre'] = prop;
					}
					else if (key === 'Kind') { trk['Kind'] = (prop === 'MPEG audio file') ? 'audio/mp3' : 'audio/wav'; }
					else if (key === 'Location') { trk['Location'] = '..' + prop.substr( prop.indexOf('c/') + 1, prop.length ); }
				}
			}
			lib.tracks.push(trk);
		}

		lib.mediaDir = lib.tracks[0].Location.substr(0, (lib.tracks[0].Location.lastIndexOf('/Music/')+7) );
		lib.genres.sort();
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

export default parseXML;