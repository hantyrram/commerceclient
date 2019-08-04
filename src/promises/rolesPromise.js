import { RoleBrowseRequest } from 'requests';

export default new Promise((resolve,reject)=>{
   (async ()=>{
      try {
         let request  = new RoleBrowseRequest();
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