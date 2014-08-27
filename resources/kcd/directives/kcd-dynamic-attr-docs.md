This allows you to provide dynamic attributes for elements in cases where angular wires things up based on those
attributes before your stuff has a chance to get compiled. One use case is form validation.

To do form validation with angular, both your form and your input need to have a `name` attribute. There are some cases
where you want to have a dynamic name (in an `ng-repeat` for example). This is the main use case for `kcd-dynamic-attr`.

You can have multiple attributes evaluated by separating their name with a comma.

```html
<div ng-init="formName = 'myInput';className = 'super-classy'">
  <input kcd-dynamic-attr="name,class" name="formName" class="className" />
</div>
```

Notice how `name="formName"` is not using the template expression syntax (`{{formName}}`), this is because it the
directive doesn't need it to. It will simply evaluate the expression itself and set the attribute to the evaluated
value.

**Note:** `kcd-dynamic-attr` only runs once and it happens immediately before other directives can compile the element.