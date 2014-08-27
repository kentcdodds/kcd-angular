Modified this from a [StackOverflow Answer](http://stackoverflow.com/a/21882091/971592). Basically allows you to specify
actions to take based on the key that is pressed using an object where the property keys are a short name, single char,
or the key code. See the supported short names in the directive's code.

Basic usage:

```html
<input ng-model="text" kcd-key-bind="{ enter: 'onEnterPressed(text)', esc: 'text=null', k: 'onKPressed()', 40: 'onDownArrowPressed()' }">
```