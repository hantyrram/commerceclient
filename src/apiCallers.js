import {emit} from './event';
import axios from './axios';

export async function permission_create(permission){
 const PATH = `/apiv1/permissions`;
 let source = '';
 try {
  
  let response = await axios.post(PATH,permission);
  let artifact = response.data;
  source = artifact.source;
  emit({type:'artifact',source:source, artifact:artifact});
  if(artifact.message) emit({type:'message',source:source, message: artifact.message});

 } catch (error) {
  let artifact;
  if(error.response){
   artifact = error.response.data;
  }
  //use artifact.error if server error response was received, 
  //error on request error e.g timeout
  emit({type:'error',source: source, error: artifact.error || error}); 
 }
}