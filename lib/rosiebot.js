'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');
var axios = require('axios');


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
    axios.post('https://api-dev.foodit.com/basket', {"restaurantId":5814808616108032,"restaurantCode":"fooditkitchen","items":[{"mealUuid":"2d12ddb1-a508-4fb1-9b6c-621e59593ef0","quantity":1,"selectedOptions":[{"group":"Liqour","selection":"White wine sauce","price":0},{"group":"Type","selection":"Classic - Tomato, Garlic, Basil","price":0}],"size":"Regular","comments":""}]}).then(function(response){
        var basketId = response.data.uuid;
        axios.put('https://api-dev.foodit.com/basket/'+basketId+'/fulfillment', {delivery: "false"}).then(function(response){
            axios.put('https://api-dev.foodit.com/basket/'+basketId+'/payment', {paymentMethod: "CASH"}).then(function(){
                axios.post('https://api-dev.foodit.com/basket/'+basketId+'/order', {"redirectUrl":"http://localhost:3000/confirmation/{orderId}?status=submitted","noPaymentUrl":"http://localhost:3000/checkout/"+basketId,"hostedFieldsPayment":false,"paymentMethod":"CASH","comments":"Test order","consumer":{"name":"test","email":"test@foodit.com","phone":"07570000000"}}).then(function(response){
                    var orderId = response.data.orderId;
                    console.log('orderId', orderId);
                    self.postMessage(originalMessage.channel, 'Vincent, we happy, here\'s your order: https://develop-at-fooditkitchen.foodit.com/confirmation/' + orderId, {as_user: true});
                })
            });
        });
    });


};

// inherits methods and properties from the Bot constructor
util.inherits(RosieBot, Bot);

module.exports = RosieBot;
