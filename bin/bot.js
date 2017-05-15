'use strict';

var http = require('http');
var RosieBot = require('../lib/rosiebot');

var requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, Rosie!\n');
}

var token = process.env.BOT_API_KEY;
var dbPath = process.env.BOT_DB_PATH;
var name = process.env.BOT_NAME;

var rosiebot = new RosieBot({
	token: token,
	dbPath: dbPath,
	name: name
});

rosiebot.run();

var server = http.createServer(requestListener);
server.listen(process.env.PORT || 5000);
