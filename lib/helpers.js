var axios = require('axios');
var _ = require('lodash');
var restaurants = require('./restaurants');

var rosieHelper = {
	getEnv: function(originalMessage){
        // get environment based on if message contains "PROD"
        return originalMessage.indexOf('PROD') > -1 ? 'api' : 'api-dev';
	},
    getRestaurant: function(originalMessage) {
        // get restaurant from the message (order me something `from restaurant`)
        var restaurantMatch = originalMessage.match(/from\s(\w+)/);
        // console.log('restaurantMatch', restaurantMatch);
        var restaurant;

        if (!restaurantMatch){
            restaurant = restaurants['fooditkitchen']
        } else {
            restaurant = restaurants[restaurantMatch[1]];
        }
        return restaurant;
    },
	getMenu: function(originalMessage){
		var restaurant = rosieHelper.getRestaurant(originalMessage);
		if (!restaurant) {
			return null;
		}
		return axios.get('https://' + rosieHelper.getEnv(originalMessage) + '.foodit.com/restaurant/' + restaurant.name);
	},
	getMenuItemByName: function(items, name, amount){
		var basketItem = {};
		var availableItem;
		availableItem = _.filter(items, function(item){
			return item.name.toLowerCase().indexOf(name.toLowerCase()) >-1
		});
		// console.log('getMenuItemByName availableItem', availableItem);

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
		// console.log('# 1 - createBasket', JSON.stringify(items));
		return axios.post('https://' + env + '.foodit.com/basket', {"restaurantId": restaurant.id,"restaurantCode":restaurant.name,"items": items});
	},
	createFulfillment: function(response, env){
		// console.log('# 2 - createFulfillment');
		var basketId = response.data.uuid;
		return axios.put('https://' + env + '.foodit.com/basket/'+basketId+'/fulfillment', {delivery: "false"});
	},
	setPayment: function(response, env){
		// console.log('# 3 - setPayment');
		var basketId = response.data.uuid;
		return axios.put('https://' + env + '.foodit.com/basket/'+basketId+'/payment', {paymentMethod: "CASH"});
	},
	doOrder: function(response, env){
		// console.log('# 4 - doOrder');
		var basketId = response.data.uuid;
		return axios.post('https://' + env + '.foodit.com/basket/'+basketId+'/order', {"redirectUrl":"http://localhost:3000/confirmation/{orderId}?status=submitted","noPaymentUrl":"http://localhost:3000/checkout/"+basketId,"hostedFieldsPayment":false,"paymentMethod":"CASH","comments":"Test order","consumer":{"name":"test","email":"test@foodit.com","phone":"07570000000"}});
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
        // console.log('getCommandFromMessage parsedText', parsedText);
        // console.log('getCommandFromMessage parsedItems', parsedItems);

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
        // console.log('command', command);

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
                basketItem = [rosieHelper.getMenuItemByName(response.data.menu.meals, command.item, command.amount)];
				// console.log('basketItem', basketItem);
            } else {
                // console.log('command.item', command.item);
                basketItem = _.map(command.item, function (item) {
                    var itemAmount = item.match(/\d+/) || [command.amount];
                    var itemName = item.replace(/and \d+ /, '');
                    return rosieHelper.getMenuItemByName(restaurantMenu, itemName, itemAmount[0]);
                });
                // console.log('All basketItem (array)', basketItem);
            }

            if (!basketItem || _.includes(basketItem, null)) {
                // console.log('Not valid basket item', basketItem);
                self.postMessage(originalMessage.channel, 'Oh dear! :scream: I\'m afraid, I couldn\'t find _' + command.item + '_, my darling... :thinking_face: but here\'s a ' + rosieHelper.getCompensation() + '  for you!' + rosieHelper.getHelpText(true), { as_user: true });
                return;
            }

            // TODO needs a HTTPS app endpoint, see https://api.slack.com/interactive-messages,
            // if (rosieHelper.getEnv(originalMessage.text) === 'api') {
            //    self.postMessage(originalMessage.channel, 'Oh dear oh dear...', { attachments: JSON.stringify([
            //        {
            //            "text": 'Are you sure you want to order from PRODUCTION for ' + rosieHelper.getRestaurant(originalMessage.text).name + '? :scream:',
            //            "fallback": "Are you sure you want to order from PRODUCTION?",
            //            "callback_id": "prod_order",
            //            "color": "#3AA3E3",
            //            "attachment_type": "default",
            //            "actions": [
            //                {
            //                    "name": "choice",
            //                    "text": "Yes, I'm sure",
            //                    "type": "button",
            //                    "value": "yes",
            //                    "confirm": {
            //                        "title": "Are you really-really-really sure?",
            //                        "text": "My darling, this is PROD you're about to order from... :scream:",
            //                        "ok_text": "Yes",
            //                        "dismiss_text": "No"
            //                    }
            //                },
            //                {
            //                    "name": "choice",
            //                    "text": "Oops. Sorry, no!",
            //                    "type": "button",
            //                    "style": "danger",
            //                    "value": "no"
            //                }
            //            ]
            //        }
			// 	]) });
			// }

            self.postMessage(originalMessage.channel, 'Alright, my darling. Just give me a sec... :timer_clock:', { as_user: true });

            rosieHelper.createBasket(
            	basketItem,
				rosieHelper.getRestaurant(originalMessage.text).name,
				rosieHelper.getEnv(originalMessage.text)
			)
                .then(function(response){
                    return rosieHelper.createFulfillment(response, rosieHelper.getEnv(originalMessage.text));
                })
                .then(function(response) {
                    return rosieHelper.setPayment(response, rosieHelper.getEnv(originalMessage.text));
                })
                .then(function(response){
                    return rosieHelper.doOrder(response, rosieHelper.getEnv(originalMessage.text));
                })
                .then(function(response){
                    var orderId = response.data.orderId;
                    self.postMessage(originalMessage.channel, 'Here\'s your order, my darling :fork_and_knife: https://develop-at-fooditkitchen.foodit.com/confirmation/' + orderId, { as_user: true });
                })
                .catch(function(error){
                    // console.log('error', error);
                    self.postMessage(originalMessage.channel, 'Oh dear! :scream: Chef told me _' + JSON.stringify(error.response) + '_, my darling... but here\'s a ' + rosieHelper.getCompensation() + '  for you!' + rosieHelper.getHelpText(true), { as_user: true });
                });
        }
    }
};

module.exports = rosieHelper;
