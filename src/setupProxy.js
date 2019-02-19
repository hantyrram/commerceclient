
let proxy;
const config = require('./config');
if(config.env === 'prod'){
 console.log(config.env)
 proxy = require('http-proxy-middleware');
}

//if multipart url does not work check this file
module.exports = function(app){
 if(proxy){
  app.use(proxy('/apiv1',{target:'http://localhost:1234/'}))
 }
}