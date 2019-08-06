import { RoleBrowseRequest } from 'requests';

export default query => new Promise((resolve,reject)=>{
   (async ()=>{
      try {
         let request  = new RoleBrowseRequest(query);
         let artifact = await request.send();
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