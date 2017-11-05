var nock = require('nock');
var data = require('mock.json');

module.exports.startMock = function(){

	// Mock for story board
	var pathRegex = /\/1\/members\/me\/boards.*/;
	nock("https://api.trello.com")
	.persist()
	.get(pathRegex)
	.reply(200, JSON.stringify(data.MeBoards) );
};