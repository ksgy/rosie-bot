const axios = require('axios');
const expect = require('chai').expect;
const sinon = require('sinon');

const rosieHelper = require('./helpers');
const response = { data: {"meta": {"id": 5814808616108032,"code": "fooditkitchen","createdAt": 1393582962000,"name": "(Test) FOODit Kitchen","address": {"buildingNumber": "14-22","addressLine1": "Elder Street","addressLine2": "London","city": null,"postcode": "E1 6BT","countryCode": "GB","singleLine": "14-22 Elder Street, London, E1 6BT"},"contactNumber": "07414806507","domain": "www.devtestkitchen.centraldish.com","imageLogoUrl": "http://lh3.googleusercontent.com/ucFpSVlMcK0aqxibe4M62Hp7oiUN1OjvgOx8OaGJTHkFf56BFn4xuOqVqSsQMheV5-RzmCgWeMtsUnNwiQx7t04","backgroundImages": {"mobile": "http://lh3.googleusercontent.com/1b8TfzNiVMtrzmAxh_nknnI8fA3Ho7WfmlJhEL_pQ-22CcEas6LDICEPHoJKyTlJnkHgifcgM09vz7zchNL0WA","tablet": "http://lh3.googleusercontent.com/Kt42ENLHMoqJQUNmLSGpHHfET03QvaIk9Xd8A8bNMJF7finmhsUI0oBX_PaPn-AfAfNxP89-3jTGjA4-T3p-","desktop": "https://lh3.googleusercontent.com/1b8TfzNiVMtrzmAxh_nknnI8fA3Ho7WfmlJhEL_pQ-22CcEas6LDICEPHoJKyTlJnkHgifcgM09vz7zchNL0WA"},"template": {"name": "tradeShow", "headerColour": null},"coordinates": {"longitude": -0.0770132, "latitude": 51.52151},"timeZone": "Europe/London","currencyCode": "GBP","payment": {"types": ["CASH", "CREDIT_CARD", "PAYPAL"], "charge": "PASSED_TO_CUSTOMER", "fee": 0.5},"cuisines": ["Sandwich", "and drinks", "salads & fresh pasta"],"modes": {"draft": false,"onlineOrdering": true,"collection": true,"delivery": true,"futureOrders": true,"tableBooking": true,"testMode": false,"offlineMode": false},"deliverySettings": {"minimumAmount": 6, "distanceRadiusInMetres": 161000},"seo": {"aboutUs": {"title": "Sandwiches, salads & fresh pasta, and drinks Restaurant at 14-22 Elder St, London, E1 6BT, GB - (Test) FOODit Kitchen","keywords": null,"description": "FOODit Kitchen is a modern British cafe that serves freshly made pasta, sandwiches and salads. We are located on 326 Essex road and open Monday through Sunday till late"},"contactUs": {"title": "Contact us at 14-22 Elder St, London, E1 6BT, GB - (Test) FOODit Kitchen","keywords": null,"description": "Get directions and find out when we are open"},"menu": {"title": "Order Online Sandwiches, salads & fresh pasta, and drinks at 14-22 Elder St, London, E1 6BT, GB - (Test) FOODit Kitchen","keywords": "","description": ""},"reviews": null},"content": {"aboutUsSectionTitle": "About Us","aboutUs": "                                                                                                                                                                                                <h2><strong>Welcome to FOODit Kitchen</strong></h2>\r\n\r\n<p><strong><a href=\"https://twitter.com/dose_espresso\">Twitter </a>| <a href=\"https://www.facebook.com/DOSEcoffee\">Facebook </a>| <a href=\"http://www.yelp.co.uk/biz/dose-london\">Yelp</a></strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr>\r\n<p><span style=\"font-family: &quot;Comic Sans MS&quot;;\">FOODit Cafe is a traditional English-Argentinian cafe with a twist - we serve handmade breakfast, sandwiches, salads and freshly made ramen dishes.&nbsp;</span></p>\r\n\r\n<p><span style=\"font-family: &quot;Comic Sans MS&quot;;\">Sandwiches are made daily and service is snappy and irritating. Why not try our <a href=\"https://ironturtle-dev.foodit.com/menu?mealUuid=2d12ddb1-a508-4fb1-9b6c-621e59593ef0&amp;mpuid=RW\" target=\"\">bruschetta</a> or our <a href=\"https://ironturtle-dev.foodit.com/menu#No Published Mains\" target=\"\">belly buster club sandwiches</a>.&nbsp;</span></p>\r\n\r\n<p><span style=\"font-family: &quot;Comic Sans MS&quot;;\">Our establishment has been restyled recently online and in house, we hope you like what you see...</span></p>\r\n\r\n<hr>\r\n<p>&nbsp;</p>\r\n\r\n                    \r\n                    \r\n                    \r\n                    \r\n                    \r\n                    \r\n                    \r\n                    ","ourFoodSectionTitle": "Our Great Food","ourFood": "Our food section that I want to fill out so we can see it in the data! Leave me here please","inTouchSectionTitle": "Get in Touch","contactUs": "                            <p></p><address><p></p><p><br></p><p><span style=\"font-size: 14.4444446563721px; line-height: 22.2222232818604px;\">We deliver to jh3jh, jkh3, kh3l,&nbsp;</span><br></p>\r\n                    </address>","promotions": {"messages": [{"message": "Get 20% discount on Monday, Tuesday and Friday.","daysOfWeek": [1, 2, 5]}],"replacePromotionText": false,"menuPage": "text","previewPage": "test3","confirmationPage": "test222"}},"thirdPartyServices": {"facebookPageUrl": "https://www.facebook.com/FOODitLimited/","tripAdvisorId": 6978275,"showTripAdvisorRating": true,"socialLinks": {"Facebook": "https://www.facebook.com","TripAdvisor": "https://www.tripadvisor.co.uk/Hotel_Review-g651973-d6978275-Reviews-Ikos_Olivia_Ikos_Resorts-Gerakini_Halkidiki_Region_Central_Macedonia.html"}},"collectionTimes": {"MONDAY": [{"from": "10:30AM", "to": "11:30PM"}],"TUESDAY": [{"from": "08:55AM", "to": "07:55PM"}],"WEDNESDAY": [{"from": "01:55AM", "to": "07:55PM"}],"THURSDAY": [{"from": "10:15AM", "to": "10:30PM"}],"FRIDAY": [{"from": "09:50AM", "to": "10:50PM"}]},"deliveryTimes": {"WEDNESDAY": [{"from": "05:05AM", "to": "08:05PM"}],"FRIDAY": [{"from": "10:30AM", "to": "10:30PM"}]},"openingTimes": {"delivery": [{"from": 1499832300000,"to": 1499886300000,"minEta": 30,"maxEta": 45}, {"from": 1500024600000, "to": 1500067800000, "minEta": 45, "maxEta": 60}, {"from": 1500437100000,"to": 1500491100000,"minEta": 30,"maxEta": 45}, {"from": 1500629400000, "to": 1500672600000, "minEta": 45, "maxEta": 60}, {"from": 1501041900000,"to": 1501095900000,"minEta": 30,"maxEta": 45}, {"from": 1501234200000, "to": 1501277400000, "minEta": 45, "maxEta": 60}, {"from": 1501646700000,"to": 1501700700000,"minEta": 30,"maxEta": 45}, {"from": 1501839000000, "to": 1501882200000, "minEta": 45, "maxEta": 60}],"collection": [{"from": 1499759700000,"to": 1499799300000,"minEta": 30,"maxEta": 45}, {"from": 1499820900000, "to": 1499885700000, "minEta": 30, "maxEta": 45}, {"from": 1499937300000,"to": 1499981400000,"minEta": 30,"maxEta": 45}, {"from": 1500022200000, "to": 1500069000000, "minEta": 45, "maxEta": 60}, {"from": 1500283800000,"to": 1500330600000,"minEta": 30,"maxEta": 45}, {"from": 1500364500000, "to": 1500404100000, "minEta": 30, "maxEta": 45}, {"from": 1500425700000,"to": 1500490500000,"minEta": 30,"maxEta": 45}, {"from": 1500542100000, "to": 1500586200000, "minEta": 30, "maxEta": 45}, {"from": 1500627000000,"to": 1500673800000,"minEta": 45,"maxEta": 60}, {"from": 1500888600000, "to": 1500935400000, "minEta": 30, "maxEta": 45}, {"from": 1500969300000,"to": 1501008900000,"minEta": 30,"maxEta": 45}, {"from": 1501030500000, "to": 1501095300000, "minEta": 30, "maxEta": 45}, {"from": 1501146900000,"to": 1501191000000,"minEta": 30,"maxEta": 45}, {"from": 1501231800000, "to": 1501278600000, "minEta": 45, "maxEta": 60}, {"from": 1501493400000,"to": 1501540200000,"minEta": 30,"maxEta": 45}, {"from": 1501574100000, "to": 1501613700000, "minEta": 30, "maxEta": 45}, {"from": 1501635300000,"to": 1501700100000,"minEta": 30,"maxEta": 45}, {"from": 1501751700000, "to": 1501795800000, "minEta": 30, "maxEta": 45}, {"from": 1501836600000,"to": 1501883400000,"minEta": 45,"maxEta": 60}, {"from": 1502098200000, "to": 1502145000000, "minEta": 30, "maxEta": 45}],"openings": [{"from": 1499759700000, "to": 1499799300000}, {"from": 1499820900000,"to": 1499886300000}, {"from": 1499937300000, "to": 1499981400000}, {"from": 1500022200000,"to": 1500069000000}, {"from": 1500283800000, "to": 1500330600000}, {"from": 1500364500000,"to": 1500404100000}, {"from": 1500425700000, "to": 1500491100000}, {"from": 1500542100000,"to": 1500586200000}, {"from": 1500627000000, "to": 1500673800000}, {"from": 1500888600000,"to": 1500935400000}, {"from": 1500969300000, "to": 1501008900000}, {"from": 1501030500000,"to": 1501095900000}, {"from": 1501146900000, "to": 1501191000000}, {"from": 1501231800000,"to": 1501278600000}, {"from": 1501493400000, "to": 1501540200000}, {"from": 1501574100000,"to": 1501613700000}, {"from": 1501635300000, "to": 1501700700000}, {"from": 1501751700000,"to": 1501795800000}, {"from": 1501836600000, "to": 1501883400000}, {"from": 1502098200000, "to": 1502145000000}]}},"menu": {"restaurantId": 5814808616108032,"name": "test menu","restaurantCode": "fooditkitchen","description": "for regression","meals": {"2d12ddb1-a508-4fb1-9b6c-621e59593ef0": {"uuid": "2d12ddb1-a508-4fb1-9b6c-621e59593ef0","name": "Bruschetta","mealLibraryId": 5898031842983936,"mealId": 849069167,"restaurantCode": "fooditkitchen","restaurantName": "(Test) FOODit Kitchen","restaurantNumericId": 5814808616108032,"primaryImageUrl": "https://lh3.googleusercontent.com/NlpdfXwHoWOphEqE6DI6dBLIsXTtm2zpZu6mnnP8OKyB_MNzm5VRhJJysAlF5FGXGf_DhaN8bZGVye1ZCtDM","mealType": null,"description": "Delicious bruschetta, traditional or modern","categoryName": "Starters","price": 4.5,"tags": ["starters", "toasted"],"sizesCount": 1,"optionGroupsCount": 4,"sizes": [{"price": 4.5,"name": "Regular","optionGroups": [{"name": "Type","options": [{"price": 0,"name": "Classic - Tomato, Garlic, Basil","defaultOption": true}, {"price": 0, "name": "Tapenade - Olive tapenade", "defaultOption": false}],"maxSelectable": 1,"multiSelect": false}, {"name": "Liqour","options": [{"price": 0, "name": "White wine sauce", "defaultOption": false}, {"price": 0,"name": "Red wine sauce","defaultOption": false}],"maxSelectable": 0,"multiSelect": true}, {"name": "Meat","options": [{"price": 2, "name": "yes", "defaultOption": true}, {"price": 0,"name": "no","defaultOption": false}],"maxSelectable": 1,"multiSelect": false}, {"name": "Everything else","options": [{"price": 0, "name": "Salt", "defaultOption": false}, {"price": 0,"name": "pepper","defaultOption": false}, {"price": 0, "name": "spice", "defaultOption": false}, {"price": 0,"name": "and everything nice","defaultOption": false}],"maxSelectable": 4,"multiSelect": true}]}],"numberOfFeedbacks": 12,"normalizedScore": "6.9","displayScoringValue": "6.9","scoreRating": "positive"},"e5323601-3be8-42f5-b2fc-da2a0c0ae48b": {"uuid": "e5323601-3be8-42f5-b2fc-da2a0c0ae48b","name": "Meat","mealLibraryId": 4790955753865216,"mealId": 234776,"restaurantCode": "fooditkitchen","restaurantName": "(Test) FOODit Kitchen","restaurantNumericId": 5814808616108032,"primaryImageUrl": "","mealType": "meat","description": "","categoryName": "Starters","price": 10,"tags": ["starters", "meat"],"sizesCount": 1,"optionGroupsCount": 2,"sizes": [{"price": 10, "name": "Regular", "optionGroups": []}],"numberOfFeedbacks": 0,"normalizedScore": null,"displayScoringValue": null,"scoreRating": null},"e4328bad-0bff-4bf4-a7b5-2e655c4bd8e6": {"uuid": "e4328bad-0bff-4bf4-a7b5-2e655c4bd8e6","name": "House Special","mealLibraryId": 5020690283495424,"mealId": 1669473275,"restaurantCode": "fooditkitchen","restaurantName": "(Test) FOODit Kitchen","restaurantNumericId": 5814808616108032,"primaryImageUrl": "","mealType": null,"description": "The specialty of the house","categoryName": "No Published Mains","price": 10.5,"tags": ["mainCourses"],"sizesCount": 1,"optionGroupsCount": 1,"sizes": [{"price": 10.5,"name": "Regular","optionGroups": [{"name": "Meat","options": [{"price": 0, "name": "Beef", "defaultOption": true}, {"price": 0,"name": "Chicken","defaultOption": false}, {"price": 0, "name": "Pork", "defaultOption": false}, {"price": 3.5,"name": "Seafood","defaultOption": false}],"maxSelectable": 1,"multiSelect": false}]}],"numberOfFeedbacks": 8,"normalizedScore": "2.8","displayScoringValue": "2.8","scoreRating": "negative"},"981fb737-b43d-4faf-9452-e5537464237b": {"uuid": "981fb737-b43d-4faf-9452-e5537464237b","name": "Sandwich","mealLibraryId": 5308412424355840,"mealId": 248330,"restaurantCode": "fooditkitchen","restaurantName": "(Test) FOODit Kitchen","restaurantNumericId": 5814808616108032,"primaryImageUrl": "","mealType": "sandwich","description": "","categoryName": "No Published Mains","price": 2.5,"tags": ["mainCourses", "sandwich"],"sizesCount": 1,"optionGroupsCount": 2,"sizes": [{"price": 2,"name": "Regular","optionGroups": [{"name": "Fillings","options": [{"price": 2, "name": "Lettuce", "defaultOption": false}, {"price": 3,"name": "Cheese","defaultOption": false}, {"price": 4, "name": "Ham", "defaultOption": false}],"maxSelectable": 0,"multiSelect": true}, {"name": "Sauce","options": [{"price": 0.6, "name": "Ketchup", "defaultOption": true}, {"price": 0.5,"name": "BBQ","defaultOption": false}, {"price": 0.5, "name": "Chutney", "defaultOption": false}],"maxSelectable": 1,"multiSelect": false}]}],"numberOfFeedbacks": 0,"normalizedScore": null,"displayScoringValue": null,"scoreRating": null},"830498e2-6770-4ea9-abf5-402364dc2036": {"uuid": "830498e2-6770-4ea9-abf5-402364dc2036","name": "Pizza","mealLibraryId": 5494944167886848,"mealId": 463018,"restaurantCode": "fooditkitchen","restaurantName": "(Test) FOODit Kitchen","restaurantNumericId": 5814808616108032,"primaryImageUrl": "","mealType": "pizza","description": "","categoryName": "No Published Mains","price": 6,"tags": ["pizza", "mainCourses"],"sizesCount": 2,"optionGroupsCount": 1,"sizes": [{"price": 6,"name": "Regular","optionGroups": [{"name": "Toppings","options": [{"price": 1, "name": "Mushrooms", "defaultOption": false}, {"price": 1,"name": "Pepperoni","defaultOption": false}, {"price": 1, "name": "Halloumi Cheese", "defaultOption": false}],"maxSelectable": 0,"multiSelect": true}]}, {"price": 9,"name": "Large","optionGroups": [{"name": "Toppings","options": [{"price": 1, "name": "Mushrooms", "defaultOption": false}, {"price": 1,"name": "Pepperoni","defaultOption": false}, {"price": 1, "name": "Halloumi Cheese", "defaultOption": false}],"maxSelectable": 0,"multiSelect": true}]}],"numberOfFeedbacks": 3,"normalizedScore": "1.3","displayScoringValue": "1.3","scoreRating": "negative"},"826db6f2-6599-439a-9ca1-e1c6d33de13b": {"uuid": "826db6f2-6599-439a-9ca1-e1c6d33de13b","name": "Tuna melt","mealLibraryId": 4979770354827264,"mealId": 19101,"restaurantCode": "fooditkitchen","restaurantName": "(Test) FOODit Kitchen","restaurantNumericId": 5814808616108032,"primaryImageUrl": "","mealType": "sandwich","description": "Toasted panini with tuna supreme and cheese","categoryName": "No Published Mains","price": 4.25,"tags": ["seafood", "fish", "mainCourses", "milk", "sandwich", "toasted"],"sizesCount": 1,"optionGroupsCount": 0,"sizes": [{"price": 4.25, "name": "Regular", "optionGroups": []}],"numberOfFeedbacks": 0,"normalizedScore": null,"displayScoringValue": null,"scoreRating": null},"bf90f908-d80d-46ff-ad40-67e8f4f9a3e0": {"uuid": "bf90f908-d80d-46ff-ad40-67e8f4f9a3e0","name": "Shoestring Fries extra long name","mealLibraryId": 5041830112526336,"mealId": 2007400835,"restaurantCode": "fooditkitchen","restaurantName": "(Test) FOODit Kitchen","restaurantNumericId": 5814808616108032,"primaryImageUrl": "","mealType": "chips","description": "Our shoestring fries are so delicious you won't be able to stop eating them","categoryName": "Draft 2 Sides","price": 4.5,"tags": ["chips", "drinks", "starters", "american", "sideDishes"],"sizesCount": 1,"optionGroupsCount": 0,"sizes": [{"price": 4.5, "name": "Regular", "optionGroups": []}],"numberOfFeedbacks": 1,"normalizedScore": "7.5","displayScoringValue": "7.5","scoreRating": "positive"},"8ae6d23e-92d4-4e78-a919-39c8f9c22e3d": {"uuid": "8ae6d23e-92d4-4e78-a919-39c8f9c22e3d","name": "Garden Salad","mealLibraryId": 5066056278212608,"mealId": 1480164352,"restaurantCode": "fooditkitchen","restaurantName": "(Test) FOODit Kitchen","restaurantNumericId": 5814808616108032,"primaryImageUrl": "","mealType": "salad","description": "Our organic garden salad comes dressed with our special viniagrette","categoryName": "Draft 2 Sides","price": 345,"tags": ["salad", "salads", "drinks", "starters", "sideDishes"],"sizesCount": 1,"optionGroupsCount": 0,"sizes": [{"price": 345, "name": "Regular", "optionGroups": []}],"numberOfFeedbacks": 3,"normalizedScore": null,"displayScoringValue": null,"scoreRating": null},"1f2c6ac9-1c31-439b-a2c7-82298c0c8d2e": {"uuid": "1f2c6ac9-1c31-439b-a2c7-82298c0c8d2e","name": "Trio of Gelato","mealLibraryId": 6463899824029696,"mealId": 289915520,"restaurantCode": "fooditkitchen","restaurantName": "(Test) FOODit Kitchen","restaurantNumericId": 5814808616108032,"primaryImageUrl": "","mealType": "dessert","description": "Choose 3 flavours from chocolate, mango, vanilla, strawberry, raspberry and hazlebut","categoryName": "Desserts","price": 6.5,"tags": ["desserts", "dessert", "sweet"],"sizesCount": 1,"optionGroupsCount": 1,"sizes": [{"price": 6.5,"name": "Regular","optionGroups": [{"name": "Flavours","options": [{"price": 0, "name": "Chocolate Gelato", "defaultOption": true}, {"price": 0,"name": "Vanilla Icecream","defaultOption": true}, {"price": 0, "name": "Strawberry Gelato", "defaultOption": false}, {"price": 0,"name": "Hazlenut Gelato","defaultOption": true}, {"price": 0, "name": "Mango Sorbet", "defaultOption": false}, {"price": 0,"name": "Raspberry Sorbet","defaultOption": false}],"maxSelectable": 0,"multiSelect": true}]}],"numberOfFeedbacks": 3,"normalizedScore": "7.5","displayScoringValue": "7.5","scoreRating": "positive"},"5d778e32-5c94-4449-abbc-a0814ce2d2a8": {"uuid": "5d778e32-5c94-4449-abbc-a0814ce2d2a8","name": "Free coke","mealLibraryId": 6414470924468224,"mealId": 1578927940,"restaurantCode": "fooditkitchen","restaurantName": "(Test) FOODit Kitchen","restaurantNumericId": 5814808616108032,"primaryImageUrl": "","mealType": "drink","description": "Coke / Sprite / Fanta","categoryName": "Drinks","price": 2.5,"tags": ["drinks", "drink"],"sizesCount": 1,"optionGroupsCount": 0,"sizes": [{"price": 2.5, "name": "Regular", "optionGroups": []}],"numberOfFeedbacks": 0,"normalizedScore": null,"displayScoringValue": null,"scoreRating": null},"7fe4b4ff-9f17-44ab-98a0-dd37a1e9bc72": {"uuid": "7fe4b4ff-9f17-44ab-98a0-dd37a1e9bc72","name": "drink one","mealLibraryId": 6060554786439168,"mealId": 702427,"restaurantCode": "fooditkitchen","restaurantName": "(Test) FOODit Kitchen","restaurantNumericId": 5814808616108032,"primaryImageUrl": "","mealType": "drink","description": "","categoryName": "Drinks","price": 0,"tags": ["drinks", "drink"],"sizesCount": 1,"optionGroupsCount": 0,"sizes": [{"price": 0, "name": "Regular", "optionGroups": []}],"numberOfFeedbacks": 0,"normalizedScore": null,"displayScoringValue": null,"scoreRating": null},"bfce60d4-c8f3-4335-869b-c5ddaead463e": {"uuid": "bfce60d4-c8f3-4335-869b-c5ddaead463e","name": "Cigarettes","mealLibraryId": 5529181447782400,"mealId": 332826,"restaurantCode": "fooditkitchen","restaurantName": "(Test) FOODit Kitchen","restaurantNumericId": 5814808616108032,"primaryImageUrl": "","mealType": null,"description": "","categoryName": "AOB","price": 0,"tags": [],"sizesCount": 1,"optionGroupsCount": 0,"sizes": [{"price": 0, "name": "Regular", "optionGroups": []}],"numberOfFeedbacks": 0,"normalizedScore": null,"displayScoringValue": null,"scoreRating": null},"f2073509-b606-424d-89d6-fd3f864d0d71": {"uuid": "f2073509-b606-424d-89d6-fd3f864d0d71","name": "Toilet paper","mealLibraryId": 6013255664795648,"mealId": 904306,"restaurantCode": "fooditkitchen","restaurantName": "(Test) FOODit Kitchen","restaurantNumericId": 5814808616108032,"primaryImageUrl": "","mealType": null,"description": "","categoryName": "AOB","price": 0,"tags": [],"sizesCount": 1,"optionGroupsCount": 0,"sizes": [{"price": 0, "name": "Regular", "optionGroups": []}],"numberOfFeedbacks": 0,"normalizedScore": null,"displayScoringValue": null,"scoreRating": null}},"categories": [{"name": "Starters","description": "asdasd","mealUuids": ["2d12ddb1-a508-4fb1-9b6c-621e59593ef0", "e5323601-3be8-42f5-b2fc-da2a0c0ae48b"]}, {"name": "No Published Mains","description": null,"mealUuids": ["e4328bad-0bff-4bf4-a7b5-2e655c4bd8e6", "981fb737-b43d-4faf-9452-e5537464237b", "830498e2-6770-4ea9-abf5-402364dc2036", "826db6f2-6599-439a-9ca1-e1c6d33de13b"]}, {"name": "Draft 2 Sides","description": null,"mealUuids": ["bf90f908-d80d-46ff-ad40-67e8f4f9a3e0", "8ae6d23e-92d4-4e78-a919-39c8f9c22e3d"]}, {"name": "Desserts","description": "cake","mealUuids": ["1f2c6ac9-1c31-439b-a2c7-82298c0c8d2e"]}, {"name": "Drinks","description": null,"mealUuids": ["5d778e32-5c94-4449-abbc-a0814ce2d2a8", "7fe4b4ff-9f17-44ab-98a0-dd37a1e9bc72"]}, {"name": "AOB","description": null,"mealUuids": ["bfce60d4-c8f3-4335-869b-c5ddaead463e", "f2073509-b606-424d-89d6-fd3f864d0d71"]}],"topDishes": ["1f2c6ac9-1c31-439b-a2c7-82298c0c8d2e", "2d12ddb1-a508-4fb1-9b6c-621e59593ef0"]}}}
const slackBot = {
    postMessage: function(){}
};

function receiveChatMessage(message) {
    rosieHelper.reply(response, slackBot, { text: message, channel: 'testchannel' });
}

describe('Rosie helper', function () {
    it('should show a restaurant not found error', function () {
        const botPostMessageStub = this.sandbox.stub(slackBot, 'postMessage');
        rosieHelper.reply(null, slackBot, { text: message, channel: 'testchannel' });
        expect(botPostMessageStub).to.be.calledWith('testchannel', sinon.match(/^Ooops/));
    });

    it('should get the dev menu from fooditkitchen', function () {
        const axiosGetStub = this.sandbox.stub(axios, 'get');
        rosieHelper.getMenu('rosie order me something');
        expect(axiosGetStub).to.be.calledWith('https://api-dev.foodit.com/restaurant/fooditkitchen')
    });

    it('should get the prod menu from fooditkitchen', function () {
        const axiosGetStub = this.sandbox.stub(axios, 'get');
        rosieHelper.getMenu('rosie order me something from fooditkitchen PROD');
        expect(axiosGetStub).to.be.calledWith('https://api.foodit.com/restaurant/fooditkitchen')
    });

    it('should get the dev menu from unittestrestaurant', function () {
        const axiosGetStub = this.sandbox.stub(axios, 'get');
        rosieHelper.getMenu('rosie order me something from unittestrestaurant');
        expect(axiosGetStub).to.be.calledWith('https://api-dev.foodit.com/restaurant/unittestrestaurant')
    });

    it('should get the prod menu from unittestrestaurant', function () {
        const axiosGetStub = this.sandbox.stub(axios, 'get');
        rosieHelper.getMenu('rosie order me something from unittestrestaurant PROD');
        expect(axiosGetStub).to.be.calledWith('https://api.foodit.com/restaurant/unittestrestaurant')
    });

    it('should reply with a DUNNO', function () {
        const botPostMessageStub = this.sandbox.stub(slackBot, 'postMessage');

        receiveChatMessage('rosie somerandomtext');
        expect(botPostMessageStub).to.be.calledWith('testchannel', sinon.match(/^Oh dear/));
    });

    it('should reply with a DUNNO', function () {
        const botPostMessageStub = this.sandbox.stub(slackBot, 'postMessage');

        receiveChatMessage('rosie somerandomtext');
        expect(botPostMessageStub).to.be.calledWith('testchannel', sinon.match(/^Oh dear/));
    });

    it('should create a basket with a random item', function () {
        const botPostMessageStub = this.sandbox.stub(slackBot, 'postMessage');
        const rosieHelperCreateBasketStub = this.sandbox.stub(rosieHelper, 'createBasket').returns(Promise.resolve({
            uuid: 0,
            data: {}
        }));
        this.sandbox.stub(rosieHelper, 'createFulfillment').returns(Promise.resolve({ data: {} }));
        this.sandbox.stub(rosieHelper, 'setPayment').returns(Promise.resolve({ data: {} }));
        this.sandbox.stub(rosieHelper, 'doOrder').returns(Promise.resolve({ data: {} }));

        receiveChatMessage('rosie order me something');
        expect(botPostMessageStub).to.be.calledWith('testchannel', sinon.match(/^Alright/));
        expect(rosieHelperCreateBasketStub).to.be.calledWith(sinon.match.array, 'fooditkitchen', 'api-dev');
    });

    it('should create a basket with a pizza', function () {
        const botPostMessageStub = this.sandbox.stub(slackBot, 'postMessage');
        const rosieHelperCreateBasketStub = this.sandbox.stub(rosieHelper, 'createBasket').returns(Promise.resolve({
            uuid: 0,
            data: {}
        }));
        this.sandbox.stub(rosieHelper, 'createFulfillment').returns(Promise.resolve({ data: {} }));
        this.sandbox.stub(rosieHelper, 'setPayment').returns(Promise.resolve({ data: {} }));
        this.sandbox.stub(rosieHelper, 'doOrder').returns(Promise.resolve({ data: {} }));

        receiveChatMessage('rosie order me a pizza');
        expect(botPostMessageStub).to.be.calledWith('testchannel', sinon.match(/^Alright/));
        expect(rosieHelperCreateBasketStub).to.be.calledWith(sinon.match([{
            comments: "",
            mealUuid: "830498e2-6770-4ea9-abf5-402364dc2036",
            quantity: 1,
            selectedOptions: [{ group: "Toppings", price: 1, selection: "Mushrooms" }],
            size: "Regular"
        }]), 'fooditkitchen', 'api-dev');
    });

    it('should create a basket with 2 bruschetta', function () {
        const botPostMessageStub = this.sandbox.stub(slackBot, 'postMessage');
        const rosieHelperCreateBasketStub = this.sandbox.stub(rosieHelper, 'createBasket').returns(Promise.resolve({
            uuid: 0,
            data: {}
        }));
        this.sandbox.stub(rosieHelper, 'createFulfillment').returns(Promise.resolve({ data: {} }));
        this.sandbox.stub(rosieHelper, 'setPayment').returns(Promise.resolve({ data: {} }));
        this.sandbox.stub(rosieHelper, 'doOrder').returns(Promise.resolve({ data: {} }));

        receiveChatMessage('rosie order me 2 bruschetta from fooditkitchen');
        expect(botPostMessageStub).to.be.calledWith('testchannel', sinon.match(/^Alright/));
        expect(rosieHelperCreateBasketStub).to.be.calledWith(sinon.match([{
            comments: "",
            mealUuid: "2d12ddb1-a508-4fb1-9b6c-621e59593ef0",
            quantity: "2",
            selectedOptions: [{ group: "Type", price: 0, selection: "Classic - Tomato, Garlic, Basil" }],
            size: "Regular"
        }]), 'fooditkitchen', 'api-dev');
    });

    it('should create a basket with 2 bruschetta and 5 pizza and 4 sandwich', function () {
        const botPostMessageStub = this.sandbox.stub(slackBot, 'postMessage');
        const rosieHelperCreateBasketStub = this.sandbox.stub(rosieHelper, 'createBasket').returns(Promise.resolve({
            uuid: 0,
            data: {}
        }));
        this.sandbox.stub(rosieHelper, 'createFulfillment').returns(Promise.resolve({ data: {} }));
        this.sandbox.stub(rosieHelper, 'setPayment').returns(Promise.resolve({ data: {} }));
        this.sandbox.stub(rosieHelper, 'doOrder').returns(Promise.resolve({ data: {} }));

        receiveChatMessage('rosie order me 2 bruschetta and 5 pizza and 4 sandwich');
        expect(botPostMessageStub).to.be.calledWith('testchannel', sinon.match(/^Alright/));
        expect(rosieHelperCreateBasketStub).to.be.calledWith(sinon.match([{
            comments: "",
            mealUuid: "830498e2-6770-4ea9-abf5-402364dc2036",
            quantity: "5",
            selectedOptions: [{ group: "Toppings", price: 1, selection: "Mushrooms" }],
            size: "Regular"
        }, {
            comments: "",
            mealUuid: "981fb737-b43d-4faf-9452-e5537464237b",
            quantity: "4",
            selectedOptions: [{ group: "Fillings", price: 2, selection: "Lettuce" }],
            size: "Regular"
        }, {
            comments: "",
            mealUuid: "2d12ddb1-a508-4fb1-9b6c-621e59593ef0",
            quantity: "2",
            selectedOptions: [{ group: "Type", price: 0, selection: "Classic - Tomato, Garlic, Basil" }],
            size: "Regular"
        }]), 'fooditkitchen', 'api-dev');
    });

    it('should create a basket with 2 bruschetta and 5 pizza and 4 sandwich from unittestrestaurant PROD', function () {
        const botPostMessageStub = this.sandbox.stub(slackBot, 'postMessage');
        const rosieHelperCreateBasketStub = this.sandbox.stub(rosieHelper, 'createBasket').returns(Promise.resolve({
            uuid: 0,
            data: {}
        }));
        this.sandbox.stub(rosieHelper, 'createFulfillment').returns(Promise.resolve({ data: {} }));
        this.sandbox.stub(rosieHelper, 'setPayment').returns(Promise.resolve({ data: {} }));
        this.sandbox.stub(rosieHelper, 'doOrder').returns(Promise.resolve({ data: {} }));

        receiveChatMessage('rosie order me 2 bruschetta and 5 pizza and 4 sandwich from unittestrestaurant PROD');
        expect(botPostMessageStub).to.be.calledWith('testchannel', sinon.match(/^Alright/));
        expect(rosieHelperCreateBasketStub).to.be.calledWith(sinon.match([{
            comments: "",
            mealUuid: "830498e2-6770-4ea9-abf5-402364dc2036",
            quantity: "5",
            selectedOptions: [{ group: "Toppings", price: 1, selection: "Mushrooms" }],
            size: "Regular"
        }, {
            comments: "",
            mealUuid: "981fb737-b43d-4faf-9452-e5537464237b",
            quantity: "4",
            selectedOptions: [{ group: "Fillings", price: 2, selection: "Lettuce" }],
            size: "Regular"
        }, {
            comments: "",
            mealUuid: "2d12ddb1-a508-4fb1-9b6c-621e59593ef0",
            quantity: "2",
            selectedOptions: [{ group: "Type", price: 0, selection: "Classic - Tomato, Garlic, Basil" }],
            size: "Regular"
        }]), 'unittestrestaurant', 'api');
    });

});
