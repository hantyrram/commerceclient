      
      
import { SearchRequest } from 'requests';


export default (entity,searchQuery) => new Promise((resolve,reject)=>{
   (async ()=>{
      try {
         let request  = new SearchRequest();  
         request.query = {entity: entity};       
         let artifact = await request.send(searchQuery);
         console.log(artifact)
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