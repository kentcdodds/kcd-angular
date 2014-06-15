Used as an [AngularJS interceptor](https://docs.angularjs.org/api/ng/service/$http#interceptors) to attach a
[JWT](http://slides.com/kentcdodds/ng-jwt-workshop#/) token to each request made the the server. Better authentication
than the cookie standard. Use it like this:

```javascript
angular.module('your.module').config(function ($httpProvider) {
  $httpProvider.interceptors.push('JWTAuthInterceptor');
});
```