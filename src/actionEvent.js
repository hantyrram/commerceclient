/**
 * Used to provide features with capability to emit actions, and other components to subscribe to these
 * actions.
 * 
 * 
 */

let subscribers = [];

export const emit = (actionName,artifact)=>{
 
 let actionSubscribers = subscribers.filter(function(actionSubscriber){
    return actionSubscriber.actionName === actionName;
 });

 for(let subscriber of actionSubscribers){
   subscriber.callback(artifact);
 }
}

export const subscribe = (actionName,callback)=>{
 let index = subscribers.push({actionName,callback}) - 1;
 let unsubscribe = (i)=>{
  subscribers.splice(i,1);
 }
 return unsubscribe.bind({},index);
}

 