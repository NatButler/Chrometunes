import * as filters from './constants/filters';

export const trkFilter = (filter, prop, tracks) => {
	let artist;
	return tracks.filter( trk => {
		if (prop === filters.ALBUM) {
			if ( filterTrack(trk, prop, filter) ) {
				if (!artist) { artist = trk.Artist; }
				return ( filterTrack(trk, prop, filter) && filterTrack(trk, filters.ARTIST, artist) );
			}
		} else {
			return filterTrack(trk, prop, filter);	
		}
	});
}

export const trkSearch = (query, tracks) => {
	return tracks.filter( trk => {
		return matchTrack(query, trk);
	});
}

const matchTrack = (query, trk) => {
	return ( stringMatch(trk.Artist, query) || stringMatch(trk.Album, query) || stringMatch(trk.Title, query) );
}

const filterTrack = (trk, prop, filter) => {
	return trk[prop] === filter;
}

const stringMatch = (a, b) => {
	// Protect against missing metadata: should be dealt with when parsing xml
	if (a) {
		return ( a.toLowerCase().indexOf(b.toLowerCase() ) != -1);
	}
}

export const sortByTrackNo = results => {
	const compare = (a, b) => {
	  return a.Track - b.Track;
	}
	return results.sort(compare);
}

// Sort not working accurately across multiple columns
export const sortByArtist = results => {
	const compare = (a, b) => {
		let artistA = a.Artist.toLowerCase();
		let artistB = b.Artist.toLowerCase();
		let albumA = a.Album.toLowerCase();
		let albumB = b.Album.toLowerCase();
		if (artistA === artistB) {
			if (albumA === albumB) {
				return a.Track - b.Track;
			} else {
				return albumA - albumB;
			}
		} else {
			return artistA - artistB;
		}
		// return (x < y) ? -1 : (x > y) ? 1 : 0;
	}
	return results.sort(compare);
}