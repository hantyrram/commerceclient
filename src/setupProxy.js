let config = require('./config');
let proxy = config.env === 'prod'? require('http-proxy-middleware'): null;


//if multipart url does not work check this file
module.exports = config.env === 'prod' ? function(app){
  app.use(proxy('/apiv1',{target:'http://localhost:1234/'}))
}:()=>{}