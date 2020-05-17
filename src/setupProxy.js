
let proxy = require('http-proxy-middleware');
//if multipart url does not work check this file
module.exports = function(app){
  app.use(proxy('/cbo/apiv1',{
   target:'http://localhost:8080/',
   logLevel:"debug"
  }))
}