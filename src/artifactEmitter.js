const subscribers = [];


export const emit = (source, artifact) => {
 let subscriberOfSource = subscriber => subscriber.source === source;
 
 let sourceSubscribers = subscribers.filter( subscriberOfSource );

 for(let subscriber of sourceSubscribers){
  subscriber.callback(artifact);
 }
}

export const subscribe = (source, callback )=> {
 let unsubscribe = function(i){
  subscribers.splice(i,1);
 };

 let index = subscribers.push({ source, callback }) - 1 ;
 
 return unsubscribe.bind({},index);
}