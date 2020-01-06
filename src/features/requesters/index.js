const config = require('../../../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/configconfig');

if(config.ENV === 'test'){
 module.exports = require('./test');
}

if(config.ENV === 'prod'){
 module.exports = require('./prod');
}