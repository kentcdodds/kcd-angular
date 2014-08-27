window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObject) {
  'use strict';
  if (/<omitted>/.test(errorMsg)) {
    console.error('Error: ' + errorObject ? errorObject.message : errorMsg);
  }
};