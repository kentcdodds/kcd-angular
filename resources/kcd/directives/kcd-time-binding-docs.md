Let's you bind two times together so one is always less than or greater than the other. Used like so:

```html
<input ng-model="startTime" kcd-time-binding="startTime" must-be="lt" other-time="endTime">
<input ng-model="endTime" kcd-time-binding="endTime" must-be="gt" other-time="startTime">
```

This will cause the `startTime` to always be one minute less than the `endTime` when the `endTime` changes.
And will cause the `endTime` to always be one minute more than the `startTime` when the `startTime` changes.