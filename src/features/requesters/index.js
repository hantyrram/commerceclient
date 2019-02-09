const config = require('../../config');

if(config.ENV === 'test'){
 module.exports = require('./test');
}

if(config.ENV === 'prod'){
 module.exports = require('./prod');
}