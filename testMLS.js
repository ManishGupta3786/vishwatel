const request = require('request');
  var body =  {
        username: "brightidxtest",
        password: "20170706",
  };
  const stringifiedObject = JSON.stringify(body);
  var options = {
        'method': 'POST',
        'url': 'http://bright-rets.tst.brightmls.com:6103/cornerstone/login',
        //'path': '/cornerstone/login',
        'headers': {
        'User-Agent': 'Bright RETS Application/1.0',
  },
  body:  stringifiedObject
  };
  request(options, function (error, response) {
  if (error) throw new Error(error);
     console.log("AAAA",response.body);

});
         
