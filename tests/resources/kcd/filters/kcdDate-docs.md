A simple wrapper around the built-in `date` filter that allows you to make a default format for your date fields.
So instead of this:

```html
{{date1 | date:"MMM d, yyyy',' h:mm a"}}
{{date2 | date:"MMM d, yyyy',' h:mm a"}}
{{date3 | date:"MMM d, yyyy',' h:mm a"}}
{{date4 | date:"MMM d, yyyy',' h:mm a"}}
```

You could do

```html
{{date1 | kcdDate}}
{{date2 | kcdDate}}
{{date3 | kcdDate}}
{{date4 | kcdDate}}
```

This would keep your date display contestant across your app.