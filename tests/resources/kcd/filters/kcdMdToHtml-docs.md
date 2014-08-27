Wraps the [marked](https://github.com/chjj/marked) library to convert markdown to html for display on a webpage.
It's what we're using to display these docs to you! Here's how you use it:

```javascript
$scope.someMarkDown = 'This is a link to [marked](https://github.com/chjj/marked)';
<div ng-bind-html="someMarkDown | kcdMdToHtml"></div>
```