const getIP = () => {
	return new Promise( (resolve, reject) => {
		const RTCPeerConnection = window.RTCPeerConnection;

		if (RTCPeerConnection) ( () => {
			const rtc = new RTCPeerConnection({ iceServers:[] });
			rtc.createDataChannel('', {reliable:false});

			let addrs = {};
			addrs['0.0.0.0'] = false;

			const updateDisplay = newAddr => {
				if (newAddr in addrs) { return; }
				else { addrs[newAddr] = true; }
				let displayAddrs = Object.keys(addrs).filter(k => { return addrs[k]; });

				resolve( displayAddrs.join(' or perhaps ') || 'n/a' );
			}

			const grepSDP = sdp => {
				sdp.split('\r\n').forEach(line => {         // c.f. http://tools.ietf.org/html/rfc4566#page-39
					if ( ~line.indexOf('a=candidate') ) {     // http://tools.ietf.org/html/rfc4566#section-5.13
						let parts = line.split(' ');           	// http://tools.ietf.org/html/rfc5245#section-15.1
						let addr = parts[4];
						let type = parts[7];
						if (type === 'host') { updateDisplay(addr); }
					} 
					else if ( ~line.indexOf('c=') ) {           // http://tools.ietf.org/html/rfc4566#section-5.7
						let parts = line.split(' ');
						let addr = parts[2];
						updateDisplay(addr);
					}
				});
			}

			rtc.onicecandidate = evt => {
				// Convert the candidate to SDP so we can run it through our general parser
				if (evt.candidate) { grepSDP('a='+evt.candidate.candidate); }
			}
			rtc.createOffer(offerDesc => {
				grepSDP(offerDesc.sdp);
				rtc.setLocalDescription(offerDesc);
			}, e => { reject('Offer failed:', e); });

		})(); else {
			document.getElementById('list').innerHTML = '<code>ifconfig | grep inet | grep -v inet6 | cut -d\' \' -f2 | tail -n1</code>';
		}    
	});
}

export default getIP;