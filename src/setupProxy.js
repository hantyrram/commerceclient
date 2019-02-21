
let proxy = require('http-proxy-middleware');
<<<<<<< HEAD
// const config = require('./config');
// if(config.env === 'prod'){
//  console.log(config.env)
//  proxy = require('http-proxy-middleware');
// }
=======
>>>>>>> d62be94307bd6fb00ab979864d7ecd3ce6e3b59a

//if multipart url does not work check this file
module.exports = function(app){
  app.use(proxy('/apiv1',{target:'http://localhost:1234/'}))
}