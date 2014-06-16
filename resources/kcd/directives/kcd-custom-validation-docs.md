A simple abstraction on top of validation. Provide an object (or array) to this directive that's structured like so:

```javascript
$scope.validators = [
  {
    name: 'not-joe',
    fn: function(value) {
      return /joe/.test(value);
    },
    watch: 'value' // will watch 'value' on the scope of the element this is on.
  },
  {
    name: 'wrong-length',
    fn: function(value) {
      return value.length !== 4;
    }
    // no watch means this will simply be added to the controller's $parsers and invoked with the viewValue.
  }
]
```

Then you'd use it like this:

```
<input kcd-custom-validation="validators">
```

And you can hook into the `$error` of this input field.