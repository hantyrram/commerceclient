/**
 * Used to provide features with capability to emit actions, and other components to subscribe to these
 * actions.
 * 
 * 
 */

/**
 * @namespace actionEvent
 */

 /**
 * 
 * @typedef actionEvent.eventResult
 * @desc A callback function that subscribes to an event
 * @type {Object}
 * @property {string} type - Can be one of error, message, artifact.
 * @property {string} source - The source of the event.
 * @property {Object} <error,message,artifact> - Depending on the type.  
 */ 

/**
 * 
 * @typedef actionEvent.eventResultSubscriber
 * @desc A callback function that subscribes to an event
 * @type {function}
 * @param actionEvent.payload
 */ 

let subscribers = [];

export const emit = (payload)=>{
 for(let i in subscribers){
  subscribers[i](payload);
 }
}

/**
 * Adds a subscriber.
 * @param {function} eventResultSubsriber
 * @return - The unsubsribe function.
 */
export const subscribe = (eventResultSubsriber)=>{
 let index = subscribers.push(eventResultSubsriber) - 1;
 let unsubscribe = (i)=>{
  subscribers.splice(i,1);
 }
 return unsubscribe.bind({},index);
}

 