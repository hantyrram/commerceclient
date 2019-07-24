import {emit,subscribe} from '../event';
import axios from '../axios';


export default class Request{
   get apiEndpoint(){
      throw new Error('Invalid API Endpoint');
   }

   get method(){
      throw new Error('Invalid Method');
   }

   async send(payload){
      console.log(this.apiEndpoint);
      this.payload = payload; //cache payload
      let source = '';
      try {
    
         let response; 
         if(payload){
            response = await axios[this.method](this.apiEndpoint,payload);
         }else{
            response = await axios[this.method](this.apiEndpoint);
         }
         let artifact = response.data;
         source = artifact.source;
         emit({type:'artifact',source:source, artifact:artifact});
         if(artifact.message) emit({type:'message',source:source, message: artifact.message});
         return artifact;
        } catch (error) {
         let artifact;
         if(error.response){
          artifact = error.response.data;
          emit({type:'error',source: source, error: artifact.error}); 
          return artifact;
         }
         //use artifact.error if server error response was received, 
         //error on request error e.g timeout
         emit({type:'error',source: source, error: error}); 
         return  {type:'error',source: source, error: error};
        }
   }

   subscribe(subsriber){
      return subscribe(subsriber);
   }
}
