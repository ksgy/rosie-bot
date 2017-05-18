var axios = require('axios');
var _ = require('lodash');

var rosieHelper = {
	getMenu: function(){
		return axios.get('https://api-dev.foodit.com/restaurant/fooditkitchen');
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
	createBasket: function(item){
		console.log('# 1 - createBasket', JSON.stringify(item));
		return axios.post('https://api-dev.foodit.com/basket', {"restaurantId":5814808616108032,"restaurantCode":"fooditkitchen","items": [item]});
	},
	createFulfillment: function(response){
		console.log('# 2 - createFulfillment');
		var basketId = response.data.uuid;
		return axios.put('https://api-dev.foodit.com/basket/'+basketId+'/fulfillment', {delivery: "false"});
	},
	setPayment: function(response){
		console.log('# 3 - setPayment');
		var basketId = response.data.uuid;
		return axios.put('https://api-dev.foodit.com/basket/'+basketId+'/payment', {paymentMethod: "CASH"});
	},
	doOrder: function(response){
		console.log('# 4 - doOrder');
		var basketId = response.data.uuid;
		return axios.post('https://api-dev.foodit.com/basket/'+basketId+'/order', {"redirectUrl":"http://localhost:3000/confirmation/{orderId}?status=submitted","noPaymentUrl":"http://localhost:3000/checkout/"+basketId,"hostedFieldsPayment":false,"paymentMethod":"CASH","comments":"Test order","consumer":{"name":"test","email":"test@foodit.com","phone":"07570000000"}});
	},
	getCompensation: function() {
        var compensations = [':cake:', ':baloon:', ':unicorn_face:', ':doughnut:'];
        return compensations[Math.floor(Math.random()*compensations.length)];
    },
	getHelpText: function (extraline) {
        return (extraline ? '\n\n' : '') + 'You can order with `rosie order me a pizza` or \n`rosie order me 2 bruschetta` or just \n`rosie order me something` :knife_fork_plate:\n\nAlso, you see our current menu with `rosie show me the menu`\n\nHope this will make you feel less ~angry~ hungry... :innocent:';
    },
    getCommandFromMessage: function(message, menuItems) {

        if (message.indexOf('list') > -1 ||
            message.indexOf('what') > -1 ||
            message.indexOf('menu') > -1 ||
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
        var parsedText = parseCommand.exec(message);
        console.log('getCommandFromMessage parsedText', parsedText);

        if (!parsedText) {
            return {
            	command: 'DUNNO'
			}
        }

        return {
			command: parsedText[1].toUpperCase(),
            who: parsedText[2],
            amount: parsedText[3],
            item: parsedText[4]
		}
    }
};

module.exports = rosieHelper;
