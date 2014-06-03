# moko-defaults

Default value plugin for [moko](https://github.com/mokojs/moko).

## Example

```js
var defaults = require('moko-defaults');

User.use(defaults);

User.attr('favoriteColor', { default: 'purple' });

User.attr('age', { default: function(user) {
  return Math.floor(15 + Math.random() * 10 ) // age between 15-25
}});

User.attr('parentAge', { default: function*(user) {
  return (yield User.find(user.parent)).age;
}});
```
