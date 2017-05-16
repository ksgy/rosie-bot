var axios = require('axios');
var _ = require('lodash');

var rosieHelper = {
	getMenu: function(){
		return axios.get('https://api-dev.foodit.com/restaurant/fooditkitchen');
	},
	getMenuItemByName: function(items, name){
		var availableItem = _.filter(items, function(item){ return item.name.toLowerCase().indexOf(name.toLowerCase()) >-1 });
		if (availableItem.length === 0) {
			return null;
		}
		return availableItem[0].uuid
	},
	createBasket: function(items){
		return axios.post('https://api-dev.foodit.com/basket', {"restaurantId":5814808616108032,"restaurantCode":"fooditkitchen","items": items});
	},
	createFulfillment: function(response){
		var basketId = response.data.uuid;
		return axios.put('https://api-dev.foodit.com/basket/'+basketId+'/fulfillment', {delivery: "false"});
	},
	setPayment: function(response){
		var basketId = response.data.uuid;
		return axios.put('https://api-dev.foodit.com/basket/'+basketId+'/payment', {paymentMethod: "CASH"});
	},
	doOrder: function(response){
		var basketId = response.data.uuid;
		return axios.post('https://api-dev.foodit.com/basket/'+basketId+'/order', {"redirectUrl":"http://localhost:3000/confirmation/{orderId}?status=submitted","noPaymentUrl":"http://localhost:3000/checkout/"+basketId,"hostedFieldsPayment":false,"paymentMethod":"CASH","comments":"Test order","consumer":{"name":"test","email":"test@foodit.com","phone":"07570000000"}});
	}
}

module.exports = rosieHelper;
