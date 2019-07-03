/**
 * @namespace TypeDefs
 * @typedef {Object.<string,Object>} UISchema - The name of the entity property.
 * @property {UISchema.<string,Object>} prop - The HTML element tag name to be used for the property.
 * @property {prop.<string>} el - The HTML element tag name to be used for the property.
 * @property {prop.<function>} [transform] - The function that will be executed to transform the value of the entity property.
 */

/**
 * @namespace TypeDefs
 * @typedef {function} actionHandler 
 * @description A function that is passed to a component such as EBrowser that handles a particular action.
 * @param {Object} entity The entity that the action handler is supposed to handle.
 * @return {Object} A React component.
 */ 