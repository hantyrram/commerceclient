import {emit,subscribe} from '../event';
import axios from 'axios';
import queryString from 'query-string';

export default class Request{
   get apiEndpoint(){
      throw new Error('Invalid API Endpoint');
   }

   get method(){
      throw new Error('Invalid Method');
   }

   async send(payload){
      this.payload = payload; //cache payload
      let source = '';
      let path = this.query? `${this.apiEndpoint}?${queryString.stringify(this.query)}`: this.apiEndpoint;
      
      try {
    
         let response; 
         if(payload){
            response = await axios[this.method](path,payload);
         }else{
            response = await axios[this.method](path);
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
