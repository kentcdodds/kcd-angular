This allows you to remove watchers from all scopes starting from an element down through its children. It has an isolate
scope so any watchers outside of it will not be affected. You can also provide it an array of expressions which can be
strings or functions in an attribute called `save-expressions` and any watchers with matching expressions will not be
removed.

This is a bit of a hack and a better way to do this would be to use the new
[one-time binding expressions](https://docs.angularjs.org/guide/expression#one-time-binding) coming in Angular 1.3.
The main usefulness of this directive is when you don't have control over the template where there are watch expressions
(like from a vendor module). The [kcd-recompile](#/kcd-recompile) directive could be useful in combination with this.