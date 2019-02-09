const proxy = require('http-proxy-middleware');
//if multipart url does not work check this file
module.exports = function(app){
  app.use(proxy('/apiv1',{target:'http://localhost:1234/'}))
}