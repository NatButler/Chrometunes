(function($) {
	
	var player = $('audio');

	player.on('ended', function() {
		console.log('Track ended');
		player.load();
		player.oncanplaythrough = player.play();
	});

})(jQuery)