var request = require('request');

request.post(
  'http://keithjgrant.superfeedr.com/?hub.mode=publish&hub.url[]=http://keithjgrant.com&hub.url=http://keithjgrant.com/posts',
  function (error, response, body) {
    if (!error && response.statusCode == 204) {
      console.log("SuperFeedr ping successful")
    }
  }
);
