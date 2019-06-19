/**
 * @namespace apis
 */

/**
 * @type {string} 
 * @const 
 */ 
const VER = 'apiv1';

/**
 * @type {Array}
 */
const APIS = [];

APIS['authenticate'] = `/${VER}/authenticate`;
APIS['login'] = `/${VER}/login`;
APIS['logout'] = `/${VER}/logout`;

export default APIS;