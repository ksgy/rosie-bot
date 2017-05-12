'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');

var RosieBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'rosie';

    this.user = null;
    this.db = null;
};

RosieBot.prototype.run = function () {
	console.log('run');
    RosieBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

/* ====== Helper functions ======= */

RosieBot.prototype._onStart = function () {
	console.log('_onStart');
    this._loadBotUser();
    this._welcomeMessage();
};


RosieBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};


RosieBot.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFromRosieBot(message) &&
        this._isMentioningRodie(message)
    ) {
        this._reply(message);
    } else {
    	// console.log('no', message)
    }
};

RosieBot.prototype._welcomeMessage = function () {
	// TODO
};

RosieBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};


RosieBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'G';
};


RosieBot.prototype._isFromRosieBot = function (message) {
    return message.user === this.user.id;
};


RosieBot.prototype._isMentioningRodie = function (message) {
    return message.text.toLowerCase().indexOf('rosie') > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1;
};

/* ======= Bot reply ====== */

RosieBot.prototype._reply = function (originalMessage) {
    var self = this;
    self.postMessage(originalMessage.channel, "test joke", {as_user: true});
};

// inherits methods and properties from the Bot constructor
util.inherits(RosieBot, Bot);

module.exports = RosieBot;
