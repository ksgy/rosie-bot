# Rosie

### Hello my dear, I'm Rosie.

![Rosie](https://github.com/ksgy/rosie-bot/raw/master/assets/images/rosie-avatar.png)

I'm [FOODit](https://github.com/foodit)'s lunch lady. I'm here to help with test orders from restaurants.

## How to order

Join slack channel `#rosies-kitchen` and you can tell Rosie what would you like:

```
rosie order me a pizza 
rosie order me 2 bruschetta 
rosie order me 2 bruschetta and 5 pizza 
rosie order me something

rosie show me the menu`
```

## TODO

- [ ] Order items with options (you can order food without options atm)
- [ ] Order items from different restaurant (you can only order form `FooditKitchen` atm)
- [ ] Refine command algorithm to recognise `Rosie, order me some pasta`, `Rosie, order me a pizza, two salad and a bruschetta`, etc
- [ ] Move from heroku to somewhere else where Rosie doesn't go to sleep every 30 mins after inactivity


## Dev
Rosie's kitchen is in K8S, deployment process:

```bash
docker build -t gcr.io/foodit-dev/rosie-bot-sushisurprise:v0.0.1 .
gcloud docker -- push gcr.io/foodit-dev/rosie-bot-sushisurprise:v0.0.1
kubectl apply -f deployment.yaml
```

## Thanks
Thanks to [Marina Kiss](mailto:hello@marinakiss.com) for the avatar! ツ
