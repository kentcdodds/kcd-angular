Used to programmatically focus on an element. Here's the API:

 - `kcdAutofocus` - when this value is changed to truthy (and not equal to `"false"`) the element will receive focus.
 If it is changed to `"false"` or a falsy value, the element will lose focus.
 - `refocus` - when this is truthy, `kcdAutofocus` will keep track of what element had focus before, and refocus on that
 element when `kcdAutofocus` is set to false. This only happens when the element has focus at the time...
 - `focusWait` - the amount of milliseconds to wait after `kcdAutofocus` has been set to a truthy value before focusing
 on the element.

Example:

```html
<input kcd-autofocus="focus" refocus focus-wait="50">
<button ng-click="onButtonPress()">Focus on Input</button>
```

```javascript
$scope.focus = false;
$scope.onButtonPress = function() {
  $scope.focus = true;
}
```