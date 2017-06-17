import parseXML from './parseXML';

export const loadLibrary = () => {
	return new Promise( (resolve, reject) => {
		const readFile = iTunesXML => {
			// Persist file to storage
			// chrome.storage.local.set({'iTunesXML': chrome.fileSystem.retainEntry(iTunesXML)});

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

		// chrome.storage.local.get('iTunesXML', file => {
		// 	console.info('Checking storage.');
		// 	if (file.iTunesXML) {
		// 		chrome.fileSystem.isRestorable(file.iTunesXML, bIsRestorable => {
  //         // the entry is still there, load the content
  //         console.info("Restoring " + file.iTunesXML);
  //         chrome.fileSystem.restoreEntry(file.iTunesXML, iTunesXML => {
  //         	console.log(iTunesXML);
  //           if (iTunesXML) {
  //             iTunesXML.isFile ? readFile(iTunesXML) : false;
  //           }
  //         });
  //       });
		// 	} 
		// 	else {
		chrome.fileSystem.chooseEntry({
			type: 'openFile', 
			suggestedName: 'iTunes Library.xml', 
			accepts: [{ 
				description: 'XML file (*.xml)', 
				extensions: ['xml'] }], 
			acceptsAllTypes: false 
		}, readFile );
		// 	}
		// });
	});
}

const convertXMLString = xml => {
	if (typeof window.DOMParser != 'undefined') {
		return ( new window.DOMParser() ).parseFromString(xml, 'text/xml');
	} else {
		throw new Error('No XML parser found');
	}
}