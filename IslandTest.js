var players = [];

(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.wait_random = function(minTime, maxTime, callback) {
        wait = minTime + (Math.random() * 1000 * (maxTime - minTime));
        console.log('Waiting for ' + wait + ' seconds');
        window.setTimeout(function() {
            callback();
        }, wait);
    };
	
	ext.clear_all_scores = function() {
		for (playerIndex = 0; playerIndex < players.length; playerIndex++) {
		  players[playerIndex].score = 0;
		}
	};
	
	ext.clear_all_players = function() {
		players.length = 0;
	};
	
	ext.get_player_count = function() {
		return players.length;
	};
	
    ext.get_player_name = function(playerIndex) {
		if ((playerIndex < 1) || (playerIndex > players.length))
		  return "";
	    else  
		  return players[playerIndex-1].name;
	};
	
    ext.get_player_costume = function(playerIndex) {
		if ((playerIndex < 1) || (playerIndex > players.length))
		  return 0;
	    else  
		  return players[playerIndex-1].costume; 
	};
	
    ext.get_player_score = function(playerIndex) {
		if ((playerIndex < 1) || (playerIndex > players.length))
		  return 0;
	    else  
		  return players[playerIndex-1].score;
	};
	
    ext.change_player_score = function(playerIndex, scoreIncrement) {
		if ((playerIndex > 0) && (playerIndex <= players.length))
		  players[playerIndex-1].score = players[playerIndex-1].score + scoreIncrement;
	};
	
	
    ext.set_player_name = function(playerIndex, newName) {
		if ((playerIndex > 0) && (playerIndex <= players.length))
		  players[playerIndex-1].name = newName;
	};
	
    ext.set_player_costume = function(playerIndex, newCostumeIndex) {
		if ((playerIndex > 0) && (playerIndex <= players.length))
		  players[playerIndex-1].costume = newCostumeIndex;
	};
	
    ext.add_player = function(newName) {
		players.push( {name: newName, costume: players.length, score: 0}); // return a different costume for each new player
	};
	
    ext.remove_player = function(playerIndex) {
		if ((playerIndex > 0) && (playerIndex <= players.length))
		   delete players[PlayerIndex-1];
	};
	
	ext.get_index_of_player = function(playerName) {
		for (playerIndex = 0; playerIndex < players.length; playerIndex++) {
		  if (players[playerIndex].name == playerName)
			  return playerIndex+1; // one-based index
		}
		// not found => return 0
		return 0;
	};

    // Block and block menu descriptions
    var playingDescriptor = {
        blocks: [
            //['w', 'wait between %n seconds and %n seconds', 'wait_random', 1, 3], // %n => integer, &m.x => menu
            [' ', 'clear all scores', 'clear_all_scores'],
            [' ', 'clear all players', 'clear_all_players'],
            ['r', 'get player count', 'get_player_count'], 
            ['r', 'get player %n name', 'get_player_name', 1], 
            ['r', 'get player %n costume', 'get_player_costume', 1], 
            ['r', 'get player %n score', 'get_player_score', 1] , 
            [' ', 'change player %n score by %n', 'change_player_score', 1, 1], 
            ['r', 'set player %n name', 'set_player_name', 1], 
            ['r', 'set player %n costume', 'set_player_costume', 1], 
            [' ', 'add player with name %s ', 'add_player', ''], 
            [' ', 'remove player %n ', 'remove_player', 1] , 
            ['r', 'get index of player %s ', 'get_index_of_player', '']  
        ]
    };


    // Register the extension
    ScratchExtensions.register('Game Playing', playingDescriptor, ext);
})({});