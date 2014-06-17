With the advent of [one-time binding expressions](https://docs.angularjs.org/guide/expression#one-time-binding) in
Angular 1.3, I want to use it all over the place to [lower my watch count](https://github.com/kentcdodds/ng-stats).

The problem is sometimes you actually do want to recompile a template if data does change and the one-time binding
doesn't do this for you. By placing this simple directive on an element a watch is added to the value of `kcd-recompile`
and the element and all of its children will be recompiled when that value is set to a non-falsey (and not === 'false')
value (and then the value will be reset to false when recompilation is complete).

*Note:* Because this directive adds a watch, it's best suited for when you have more than one expression, or the
expression you would otherwise be watching makes your digest cycle take longer (like an expression that calls a
function that makes some kind of calculation).

Watches run *all the time*, so if you're not careful they can slow down your app. Hopefully this is helpful for allowing
you to control when a template is recompiled and take advantage of the one-time binding 1.3 will give us.

Usage:

```html
<div ng-repeat="thing in ::things" kcd-recompile="recompile.things">
  <img ng-src="{{::thing.getImage()}}">
  <span>{{::thing.name}}</span>
</div>
```

```javascript
$scope.recompile = { things: false };
$scope.$on('things.changed', function() { // or some other notification mechanism that you need to recompile...
  $scope.recompile.things = true;
});
```
