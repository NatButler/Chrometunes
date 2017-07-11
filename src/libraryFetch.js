import parseXML from './parseXML';

export const fetchLibrary = () => {
	return new Promise( (resolve, reject) => {
		const readFile = iTunesXML => {
			// Persist file to storage
			if (iTunesXML) {
				persistToStorage(iTunesXML);
				
				// Read file
				iTunesXML.file(xml => {
					let reader = new FileReader();
					reader.readAsText(xml);
					// reader.onerror = errorHandler;
					reader.onload = e => {
						console.time('parseXML');
						const library = parseXML( convertXMLString(e.target.result) );
						console.timeEnd('parseXML');
						library.then(lib => { return resolve(lib); }).catch(reason => { console.error(reason); });
					}
				});
			}
		}

		// const readDir = iTunesDir => {
		// 	if (iTunesDir) {
		// 		persistToStorage(iTunesDir);






		// 	}
		// }

		const persistToStorage = path => {
				chrome.storage.local.set({ 'path': chrome.fileSystem.retainEntry(path) });
		}

		chrome.fileSystem.chooseEntry({
			type: 'openFile', 
			suggestedName: 'iTunes Library.xml', 
			accepts: [{ 
				description: 'XML file (*.xml)', 
				extensions: ['xml'] }], 
			acceptsAllTypes: false 
		}, readFile );

		// chrome.fileSystem.chooseEntry({
		// 	type: 'openDirectory'
		// }, readDir );
	});
}

const convertXMLString = xml => {
	if (typeof window.DOMParser != 'undefined') {
		return ( new window.DOMParser() ).parseFromString(xml, 'text/xml');
	} else {
		throw new Error('No XML parser found');
	}
}