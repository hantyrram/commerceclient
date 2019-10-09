import { RoleBrowseRequest } from 'requests';
import queryString from 'query-string';

export default new Promise((resolve,reject)=>{
   (async ()=>{
      try {
         let request  = new RoleBrowseRequest();
         let artifact = await request.send();
         console.log(artifact);
         if(artifact.status === 'ok'){
            resolve(artifact.data.entity);
            return;
         }
         reject(artifact);   
      } catch (error) {
         reject(error);
      }
      
   })()
})