'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');
var rosieHelper = require('./helpers');
var _ = require('lodash');

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

	var command = rosieHelper.getCommandFromMessage(originalMessage.text, this.menu);
	console.log('command', command);

    if (command.command === 'DUNNO') {
        self.postMessage(originalMessage.channel, 'Oh dear! :scream: I\'m afraid, I didn\'t get that, my darling... :thinking_face: but here\'s a ' + rosieHelper.getCompensation() + ' for you!' + rosieHelper.getHelpText(true), {as_user: true});
        return;
    }

	if (command.command === 'LIST') {
		var menu = '';
		var menuKeys = Object.keys(self.menu);
        for (var i = 0; i < menuKeys.length; i++) {
            menu += (i+1) + ') ' + self.menu[menuKeys[i]].name + '\n';
        }
        self.postMessage(originalMessage.channel, 'I\'m glad you asked! :relaxed: \nHere\'s our current menu at *' + self.menu[menuKeys[0]].restaurantName + '*, my darling...\n\n' + menu + rosieHelper.getHelpText(true), { as_user: true });
		return;
	}

	if (command.command === 'ORDER') {
		var basketItem;

        if (typeof command.item === 'string') {
            basketItem = [rosieHelper.getMenuItemByName(this.menu, command.item, command.amount)];

		} else {
        	console.log('command.item', command.item);
            basketItem = _.map(command.item, function (item) {
                var itemAmount = item.match(/\d+/);
                var itemName = item.replace(/and \d+ /, '');
				return rosieHelper.getMenuItemByName(self.menu, itemName, itemAmount[0]);
            });
			console.log('arr basketItem', basketItem);
		}

        if (!basketItem || _.includes(basketItem, null)) {
            console.log('Not valid basket item', basketItem);
            self.postMessage(originalMessage.channel, 'Oh dear! :scream: I\'m afraid, I couldn\'t find _' + command.item + '_, my darling... :thinking_face: but here\'s a ' + rosieHelper.getCompensation() + '  for you!' + rosieHelper.getHelpText(true), { as_user: true });
            return;
        }

        self.postMessage(originalMessage.channel, 'Alright, my darling. Just give me a sec... :timer_clock:', { as_user: true });

        rosieHelper.createBasket(basketItem)
            .then(rosieHelper.createFulfillment)
            .then(rosieHelper.setPayment)
            .then(rosieHelper.doOrder)
            .then(function(response){
                var orderId = response.data.orderId;
                self.postMessage(originalMessage.channel, 'Here\'s your order, my darling :fork_and_knife: https://develop-at-fooditkitchen.foodit.com/confirmation/' + orderId, { as_user: true });
            })
            .catch(function(error){
                console.log('error', error);
                self.postMessage(originalMessage.channel, 'Oh dear! :scream: Chef told me _' + error.response.data + '_, my darling... but here\'s a ' + rosieHelper.getCompensation() + '  for you!' + rosieHelper.getHelpText(true), { as_user: true });
            });
	}

};

// inherits methods and properties from the Bot constructor
util.inherits(RosieBot, Bot);

module.exports = RosieBot;
