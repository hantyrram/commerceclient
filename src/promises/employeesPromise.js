import { EmployeeBrowseRequest } from 'requests';

export default new Promise((resolve,reject)=>{
   (async ()=>{
      try {
         let request  = new EmployeeBrowseRequest();
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