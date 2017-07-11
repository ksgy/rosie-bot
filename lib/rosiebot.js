'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');
var rosieHelper = require('./helpers');
var _ = require('lodash');
var restaurants = require('./restaurants');

var RosieBot = function Constructor(settings) {
	this.settings = settings;
	this.settings.name = this.settings.name || 'rosie';

	this.user = null;
};

RosieBot.prototype.run = function () {
	RosieBot.super_.call(this, this.settings);

	this.on('start', this._onStart);
	this.on('message', this._onMessage);
};

/* ====== Helper functions ======= */

RosieBot.prototype._onStart = function () {
	this._loadBotUser();
};


RosieBot.prototype._isMemeberJoinedChannel = function (message) {
	return message.type === 'member_joined_channel';
};

RosieBot.prototype._isHiForRosie = function (message) {
	var m = message.type === 'message' && message.text && message.text.match(/^(?=.*(hi(?!ng)|hello|ciao))(?=.*rosie).+/gmi) || [];
    return m.length > 0;
};

RosieBot.prototype._loadBotUser = function () {
	var self = this;
	this.user = this.users.filter(function (user) {
		return user.name === self.name;
	})[0];
};

RosieBot.prototype._onMessage = function (message) {
	// If it's a bot message, like IFTTT, add message.text
	if (message.attachments && message.attachments.length > 0) {
		message.text = message.attachments[0].pretext;
	}

    if (this._isHiForRosie(message) && !this._isFromRosieBot(message)) {
        this._sayHi(message);
        return;
    }
    if (this._isMemeberJoinedChannel(message) && !this._isFromRosieBot(message)) {
        this._welcomeNewUser(message);
        return;
    }
    if (this._isMemeberJoinedChannel(message) && this._isFromRosieBot(message)) {
        this._welcomeMessage(message);
        return;
    }

	if (this._isChatMessage(message) &&
		this._isChannelConversation(message) &&
		!this._isFromRosieBot(message) &&
		this._isMentioningRosie(message)
	) {
		this._reply(message);
	} else {
    }
};

RosieBot.prototype._welcomeMessage = function (originalMessage) {
    var self = this;
    self.postMessage(originalMessage.channel, 'Oh, hello everyone :eyes: I\'m Rosie. :relaxed:\nI\'m the lunch lady here, to help with test orders from restaurants.\n\nJust simply type `rosie how can I order`.\n\n...and here\'s a welcome' + rosieHelper.getCompensation() + ' for you all! :hearts:', { as_user: true });
};

RosieBot.prototype._isChatMessage = function (message) {
	return message.type === 'message' && Boolean(message.text);
};


RosieBot.prototype._isChannelConversation = function (message) {
	return typeof message.channel === 'string' &&
		(message.channel[0] === 'C' ||
		message.channel[0] === 'G');
};


RosieBot.prototype._isFromRosieBot = function (message) {
	return message.user === this.user.id;
};


RosieBot.prototype._isMentioningRosie = function (message) {
	return message.text.toLowerCase().indexOf('rosie') > -1 ||
		message.text.toLowerCase().indexOf(this.name) > -1;
};

/* ======= Bot reply ====== */

RosieBot.prototype._sayHi = function (originalMessage) {
    var self = this;
    self.postMessage(originalMessage.channel, 'Hello my dear... :relaxed:\n\nHere\'s a ' + rosieHelper.getCompensation() + ', just for you! :hearts:', { as_user: true });
};

RosieBot.prototype._welcomeNewUser = function (originalMessage) {
    var self = this;
    self.postMessage(originalMessage.channel, 'Hello my dear, I\'m Rosie. :relaxed:\nI\'m the lunch lady here, to help with test orders from restaurants.\n\nJust simply type `rosie how can I order`.\n\n...and here\'s a welcome' + rosieHelper.getCompensation() + ', just for you! :hearts:', { as_user: true });
};

RosieBot.prototype._reply = function (originalMessage) {
	var self = this;
	// console.log('originalMessage', JSON.stringify(originalMessage));
    rosieHelper.getMenu(originalMessage.text).then(function(response){
        rosieHelper.reply(response, self, originalMessage);
	});
};

// inherits methods and properties from the Bot constructor
util.inherits(RosieBot, Bot);

module.exports = RosieBot;
