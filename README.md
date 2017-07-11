# Rosie

### Hello my dear, I'm Rosie.

![Rosie](https://github.com/ksgy/rosie-bot/raw/master/assets/images/rosie-avatar.png)

I'm [FOODit](https://github.com/foodit)'s lunch lady. I'm here to help with test orders from restaurants.

## How to order

Join slack channel `#rosies-orders` and you can tell Rosie what would you like:

```
rosie order me a pizza 
rosie order me 2 bruschetta 
rosie order me 2 bruschetta and 5 pizza 
rosie order me something
rosie order me something from autotestgrill

rosie show me the menu`
```

*Note:* All orders are made to `fooditkitchen` on `dev`. If you'd like to order from `prod` you have to let Rosie know by:
 
```
rosie order me something from autotestgrill PROD
```

*Note:* `PROD` has to be uppercase!

## TODO

- [ ] Order items with options (you can order food without options atm)
- [x] Order items from different restaurant (you can only order form `FooditKitchen` atm)
- [x] Refine command algorithm to recognise `Rosie, order me some pasta`, `Rosie, order me a pizza, two salad and a bruschetta`, etc
- [x] Move from heroku to somewhere else where Rosie doesn't go to sleep every 30 mins after inactivity


## Dev
Rosie's kitchen is in Kubernetes. See `dev` pods for the pod name: `kubectl get pods`

## Testing
There are some really simple unit tests. Run by `npm test` (watch enabled by default)

## Thanks
Thanks to [Marina Kiss](mailto:hello@marinakiss.com) for the avatar! ツ
