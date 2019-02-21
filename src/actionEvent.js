/**
 * Used to provide features with capability to emit actions, and other components to subscribe to these
 * actions.
 * 
 * 
 */

let subscribers = [];

export const emit = (actionName,artifact)=>{
 for(let i in subscribers){
  subscribers[i](actionName,artifact);
 }
}

export const subscribe = (callback)=>{
 let index = subscribers.push(callback) - 1;
 let unsubscribe = (i)=>{
  subscribers.splice(i,1);
 }
 return unsubscribe.bind({},index);
}

 