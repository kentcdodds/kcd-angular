Allows you to dynamically apply a filter. This is useful in an `ng-repeat` where the filter name is on the objects
being repeated but not in all cases.
```javascript
{{something | kcdDynamicFilter: filterName }}
```