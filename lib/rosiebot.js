'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');
var rosieHelper = require('./helpers');


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
	this._welcomeMessage();
	this._loadMenu();
	this._keepAlive();
};


RosieBot.prototype._keepAlive = function () {
	setTimeout(function(){
		axios.get('https://rosiebot.herokuapp.com/');
	}, 7200000);
};

RosieBot.prototype._loadMenu = function () {
	var self = this;
	rosieHelper.getMenu()
		.then(function(response){
			self.menu = response.data.menu.meals
		});
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
	var parseCommand = /rosie\s(order) ([a-z]+)\s(\d+)\s([a-z]+)/gi;
	console.log('originalMessage.text', originalMessage.text);
	var parsedText = parseCommand.exec(originalMessage.text);
	console.log('parsedText', parsedText);
	// TODO :cake: :balloon:

	if (!parsedText) {
		self.postMessage(originalMessage.channel, 'Oh dear! :scream: I\'m afraid, I didn\'t get that, my darling... :thinking_face: but here\'s a :cake: for you!', { as_user: true });
		return;
	}
	var command = parsedText[1];
	var who = parsedText[2];
	var amount = parsedText[3];
	var itemName = parsedText[4];

	console.log('parsed item', command, who, amount, itemName);

	var basketItem = rosieHelper.getMenuItemByName(this.menu, itemName, amount);
	if (!basketItem) {
		console.log('Not valid basket item', basketItem)
		self.postMessage(originalMessage.channel, 'Oh dear! :scream: I\'m afraid, I couldn\'t find ' + itemName + ', my darling... :thinking_face: but here\'s a :cake: for you!', { as_user: true });
		return;
	}

	rosieHelper.createBasket(basketItem)
		.then(rosieHelper.createFulfillment)
		.then(rosieHelper.setPayment)
		.then(rosieHelper.doOrder)
		.then(function(response){
			var orderId = response.data.orderId;
			self.postMessage(originalMessage.channel, 'Here\'s your order, my darling :fork_and_knife: https://develop-at-fooditkitchen.foodit.com/confirmation/' + orderId, { as_user: true });
		})
		.catch(function(error){
			self.postMessage(originalMessage.channel, 'Oh dear! :scream: Chef told me _' + JSON.stringify(error.response.data) + '_, my darling... but here\'s a :cake: for you!', { as_user: true });
		});
};

// inherits methods and properties from the Bot constructor
util.inherits(RosieBot, Bot);

module.exports = RosieBot;
