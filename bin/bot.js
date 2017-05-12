'use strict';

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
