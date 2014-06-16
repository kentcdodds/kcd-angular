Useful for password and password confirmation input fields. Use like so:

```html
<input ng-model="password" type="password" placeholder="Your password">
<input pk-input-match="{{password}}" ng-model="password2" type="password" placeholder="Your password again (just in case)">
```

This will set the field's `$error.match` property to whether it matches the given value or not.