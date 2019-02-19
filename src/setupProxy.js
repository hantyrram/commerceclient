<<<<<<< HEAD

let proxy = require('http-proxy-middleware');
// const config = require('./config');
// if(config.env === 'prod'){
//  console.log(config.env)
//  proxy = require('http-proxy-middleware');
// }

=======
let proxy = require('http-proxy-middleware');
>>>>>>> dev
//if multipart url does not work check this file
module.exports = function(app){
  app.use(proxy('/apiv1',{target:'http://localhost:1234/'}))
}