var axios = require('axios');
var _ = require('lodash');
var restaurants = require('./restaurants');

var rosieHelper = {
	getMenu: function(originalMessage){
        // get environment based on if message contains "PROD"
        var env = originalMessage.indexOf('PROD') > -1 ? 'prod' : 'dev';

        // get restaurant from the message (order me something `from restaurant`)
        var restaurantMatch = originalMessage.match(/from\s(\w+)/);
        console.log('restaurantMatch', restaurantMatch);
        var restaurant;

        if (!restaurantMatch){
            restaurant = restaurants['fooditkitchen']
        } else {
            restaurant = restaurants[restaurantMatch[1]];
        }

		return axios.get('https://api-' + env + '.foodit.com/restaurant/' + restaurant.name);
	},
	getMenuItemByName: function(items, name, amount){
		var basketItem = {};
		var availableItem;
		availableItem = _.filter(items, function(item){
			return item.name.toLowerCase().indexOf(name.toLowerCase()) >-1
		});
		console.log('getMenuItemByName availableItem', availableItem);

		if (availableItem.length === 0) {
			return null;
		}

		if (availableItem[0].sizes.length > 0) {
			basketItem.size = availableItem[0].sizes[0].name;

			if (availableItem[0].sizes[0].optionGroups.length > 0) {
				basketItem.selectedOptions = [{
					"group": availableItem[0].sizes[0].optionGroups[0].name,
					"price": availableItem[0].sizes[0].optionGroups[0].options[0].price,
					"selection": availableItem[0].sizes[0].optionGroups[0].options[0].name
				}]
			}
		}

		basketItem.quantity = (amount === 'a') ? 1 : amount;
        basketItem.mealUuid = availableItem[0].uuid;
        basketItem.comments = '';
		return basketItem;
	},
	createBasket: function(items, restaurant, env){
		console.log('# 1 - createBasket', JSON.stringify(items));
		return axios.post('https://api-' + env + '.foodit.com/basket', {"restaurantId": restaurant.id,"restaurantCode":restaurant.name,"items": items});
	},
	createFulfillment: function(response, env){
		console.log('# 2 - createFulfillment');
		var basketId = response.data.uuid;
		return axios.put('https://api-' + env + '.foodit.com/basket/'+basketId+'/fulfillment', {delivery: "false"});
	},
	setPayment: function(response, env){
		console.log('# 3 - setPayment');
		var basketId = response.data.uuid;
		return axios.put('https://api-' + env + '.foodit.com/basket/'+basketId+'/payment', {paymentMethod: "CASH"});
	},
	doOrder: function(response, env){
		console.log('# 4 - doOrder');
		var basketId = response.data.uuid;
		return axios.post('https://api-' + env + '.foodit.com/basket/'+basketId+'/order', {"redirectUrl":"http://localhost:3000/confirmation/{orderId}?status=submitted","noPaymentUrl":"http://localhost:3000/checkout/"+basketId,"hostedFieldsPayment":false,"paymentMethod":"CASH","comments":"Test order","consumer":{"name":"test","email":"test@foodit.com","phone":"07570000000"}});
	},
	getCompensation: function() {
        var compensations = [':cake:', ':balloon:', ':unicorn_face:', ':doughnut:', ':cookie:'];
        return compensations[Math.floor(Math.random()*compensations.length)];
    },
	getHelpText: function (extraline) {
        return (extraline ? '\n\n' : '') + 'You can order with\n`rosie order me a pizza` or \n`rosie order me 2 bruschetta` or \n`rosie order me 2 bruschetta and 5 pizza and 4 sandwich` or just \n`rosie order me something` :knife_fork_plate:\n\nAlso, you can see our current menu (fooditkitchen on dev) with `rosie show me the menu`\n\nHope this will make you feel less ~angry~ hungry... :innocent:';
    },
    getCommandFromMessage: function(message, menuItems) {

        if (message.indexOf('list') > -1 ||
            message.indexOf('what') > -1 ||
            message.indexOf('menu') > -1 ||
            message.indexOf('help') > -1 ||
            message.indexOf('how') > -1){
        	return {
        		command: 'LIST'
			}
		}

		if (message.indexOf('something') > -1) {
            var keys = Object.keys(menuItems);
            var a = keys[Math.floor(Math.random()*keys.length)];

        	return {
        		command: 'ORDER',
				amount: 1,
				item: menuItems[a].name
			}
		}

        var parseCommand = /rosie\s(order) ([a-z]+)\s(\d+|a)\s([a-z]+)/gi;
        var parseMultipleItems = /and\s(\d+|a)\s([a-z]+)/gi;
        var parsedText = parseCommand.exec(message);
        var parsedItems = message.match(parseMultipleItems);
        if (parsedItems) {
            //  add brushcetta from `rosie order me 2 bruschetta and 5 pizza and 4 sandwich`
            parsedItems.push(parsedText[4]);
        }
        console.log('getCommandFromMessage parsedText', parsedText);
        console.log('getCommandFromMessage parsedItems', parsedItems);

        if (!parsedText) {
            return {
            	command: 'DUNNO'
			}
        }

        return {
			command: parsedText[1].toUpperCase(),
            who: parsedText[2],
            amount: parsedText[3],
            item: parsedItems || parsedText[4]
		}
    },
	reply: function(response, self, originalMessage){

        var restaurantMenu = response.data.menu.meals;
        var command = rosieHelper.getCommandFromMessage(originalMessage.text, restaurantMenu);
        console.log('command', command);

        if (command.command === 'DUNNO') {
            self.postMessage(originalMessage.channel, 'Oh dear! :scream: I\'m afraid, I didn\'t get that, my darling... :thinking_face: but here\'s a ' + rosieHelper.getCompensation() + ' for you!' + rosieHelper.getHelpText(true), {as_user: true});
            return;
        }

        if (command.command === 'LIST') {
            var menu = '';
            var menuKeys = Object.keys(restaurantMenu);
            for (var i = 0; i < menuKeys.length; i++) {
                menu += (i+1) + ') ' + restaurantMenu[menuKeys[i]].name + '\n';
            }
            self.postMessage(originalMessage.channel, 'I\'m glad you asked! :relaxed: \nHere\'s our current menu at *' + restaurantMenu[menuKeys[0]].restaurantName + '*, my darling...\n\n' + menu + rosieHelper.getHelpText(true), { as_user: true });
            return;
        }

        if (command.command === 'ORDER') {
            var basketItem;

            if (typeof command.item === 'string') {
                basketItem = [rosieHelper.getMenuItemByName(self.menu, command.item, command.amount)];

            } else {
                console.log('command.item', command.item);
                basketItem = _.map(command.item, function (item) {
                    var itemAmount = item.match(/\d+/) || [command.amount];
                    var itemName = item.replace(/and \d+ /, '');
                    return rosieHelper.getMenuItemByName(restaurantMenu, itemName, itemAmount[0]);
                });
                console.log('All basketItem (array)', basketItem);
            }

            if (!basketItem || _.includes(basketItem, null)) {
                console.log('Not valid basket item', basketItem);
                self.postMessage(originalMessage.channel, 'Oh dear! :scream: I\'m afraid, I couldn\'t find _' + command.item + '_, my darling... :thinking_face: but here\'s a ' + rosieHelper.getCompensation() + '  for you!' + rosieHelper.getHelpText(true), { as_user: true });
                return;
            }

            self.postMessage(originalMessage.channel, 'Alright, my darling. Just give me a sec... :timer_clock:', { as_user: true });

            rosieHelper.createBasket(basketItem, restaurant, env)
                .then(function(response){
                    rosieHelper.createFulfillment(response, env);
                })
                .then(function(response) {
                    rosieHelper.setPayment(response, env);
                })
                .then(function(response){
                    rosieHelper.doOrder(response, env);
                })
                .then(function(response){
                    var orderId = response.data.orderId;
                    self.postMessage(originalMessage.channel, 'Here\'s your order, my darling :fork_and_knife: https://develop-at-fooditkitchen.foodit.com/confirmation/' + orderId, { as_user: true });
                })
                .catch(function(error){
                    console.log('error', error);
                    self.postMessage(originalMessage.channel, 'Oh dear! :scream: Chef told me _' + error.response.data + '_, my darling... but here\'s a ' + rosieHelper.getCompensation() + '  for you!' + rosieHelper.getHelpText(true), { as_user: true });
                });
        }
    }
};

module.exports = rosieHelper;
