var axios = require('axios');
var _ = require('lodash');

var rosieHelper = {
	getMenu: function(){
		return axios.get('https://api-dev.foodit.com/restaurant/fooditkitchen');
	},
	getMenuItemByName: function(items, name, amount){
		console.log('getMenuItemByName');
		var basketItem = {};
		var availableItem = _.filter(items, function(item){ return item.name.toLowerCase().indexOf(name.toLowerCase()) >-1 });
		if (availableItem.length === 0) {
			return null;
		}

		if (availableItem[0].sizes.length > 0) {
			basketItem.size = availableItem[0].sizes[0];

			if (availableItem[0].sizes[0].optionGroups.length > 0) {
				basketItem.selectedOptions = {
					"group": availableItem[0].sizes[0].optionGroups[0].name,
					"price": availableItem[0].sizes[0].optionGroups[0].options[0].price,
					"selection": availableItem[0].sizes[0].optionGroups[0].options[0].name
				}
			}
		}
		basketItem.quantity = amount;
		console.log('basketItem', basketItem)
		return basketItem;
	},
	createBasket: function(item){
		console.log('createBasket', JSON.stringify(item));
		return axios.post('https://api-dev.foodit.com/basket', {"restaurantId":5814808616108032,"restaurantCode":"fooditkitchen","items": item});
	},
	createFulfillment: function(response){
		console.log('createFulfillment');
		var basketId = response.data.uuid;
		return axios.put('https://api-dev.foodit.com/basket/'+basketId+'/fulfillment', {delivery: "false"});
	},
	setPayment: function(response){
		console.log('setPayment');
		var basketId = response.data.uuid;
		return axios.put('https://api-dev.foodit.com/basket/'+basketId+'/payment', {paymentMethod: "CASH"});
	},
	doOrder: function(response){
		console.log('doOrder');
		var basketId = response.data.uuid;
		return axios.post('https://api-dev.foodit.com/basket/'+basketId+'/order', {"redirectUrl":"http://localhost:3000/confirmation/{orderId}?status=submitted","noPaymentUrl":"http://localhost:3000/checkout/"+basketId,"hostedFieldsPayment":false,"paymentMethod":"CASH","comments":"Test order","consumer":{"name":"test","email":"test@foodit.com","phone":"07570000000"}});
	}
};

module.exports = rosieHelper;
