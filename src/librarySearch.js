import * as filterTypes from './constants/filterTypes';

// SEARCH
export const trkSearch = (tracks, query) => {
	return tracks.filter( trk => {
		return matchTrack(query, trk);
	});
}

const matchTrack = (query, trk) => {
	return ( stringMatch(trk[filterTypes.ARTIST], query) || stringMatch(trk[filterTypes.ALBUM], query) || stringMatch(trk[filterTypes.TITLE], query) );
}

const stringMatch = (a, b) => {
	if (a) { // Protect against missing metadata: should be dealt with when parsing xml
		return ( a.toLowerCase().indexOf(b.toLowerCase() ) != -1);
	}
}

// FILTER
export const trkFilter = (
	tracks,
	filter,
	type
) => {
	switch(type) {
		case filterTypes.ALBUM:
			return sortByTrackNo( 
				tracks.filter( (t, i) => {
					return t[type] === filter[type] && t[filterTypes.ARTIST] === filter[filterTypes.ARTIST];
				}) 
			);
		default:
			return tracks.filter( t => {
				return t[type] === filter;
			});
	}
}

// const filterTrack = (trk, type, filter) => {
// 	return trk[type] === filter;
// }


// SORT
export const sortByTrackNo = tracks => {
	const compare = (a, b) => {
		return a.Disc - b.Disc || a.Track - b.Track;
	}
	return tracks.sort(compare);
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