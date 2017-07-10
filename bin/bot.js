'use strict';

var http = require('http');
var RosieBot = require('../lib/rosiebot');

var token = process.env.BOT_API_KEY;
var dbPath = process.env.BOT_DB_PATH;
var name = process.env.BOT_NAME;

var rosiebot = new RosieBot({
	token: token,
	dbPath: dbPath,
	name: name
});

rosiebot.run();

// Set up 'health' endpoint for k8s
var server = http.createServer(function (req, res) {
    if (req.url === '/health') {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write('{ "status": "ok" }');
    }
    res.end();
});

server.listen(8080);
console.log('Rosie slackbot listening on 8080');
