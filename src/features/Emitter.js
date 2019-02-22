class Emitter{
 constructor(){
  this.subscribers = [];
 }

 emit(actionName,artifact){
  for(let i in subscribers){
   this.subscribers[i](actionName,artifact);
  }
 }

 on(callback){
  let index = subscribers.push(callback) - 1;
  let unsubscribe = (i)=>{
   subscribers.splice(i,1);
  }
  return unsubscribe.bind({},index);
  }
 } 
/**
 * Used to provide features with capability to emit actions, and other components to subscribe to these
 * actions.
 * 
 * 
 */


 