import {emit} from './event';
import axios from './axios';

export async function permission_browse(){
 const PATH = `/apiv1/permissions`;
 let source = '';
 try {
  
  let response = await axios.get(PATH);
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
   emit({type:'error',source: source, error: artifact.error }); 
   return;
  }
  //use artifact.error if server error response was received, 
  //error on request error e.g timeout
  emit({type:'error',source: source, error: error}); 
 }
}

export async function permission_delete(permission){
 const PATH = `/apiv1/permissions/${permission.name}`;
 let source = '';
 try {
  
  let response = await axios.delete(PATH);
  let artifact = response.data;
  source = artifact.source;
  emit({type:'artifact',source:source, artifact:artifact});
  if(artifact.message) emit({type:'message',source:source, message: artifact.message});

 } catch (error) {
  let artifact;
  if(error.response){
   artifact = error.response.data;
   emit({type:'error',source: source, error: artifact.error }); 
   return;
  }
  //use artifact.error if server error response was received, 
  //error on request error e.g timeout
  emit({type:'error',source: source, error: error}); 
 }
}


export async function role_browse(){
 const PATH = `/apiv1/roles`;
 let source = '';
 try {
  
  let response = await axios.get(PATH);
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
   artifact = {status : 'nok', error:{type: 'CLIENT', text:'Failed Fetch Attempt'}};
   return artifact;
 }
}

export async function role_add(role){
   const PATH = `/apiv1/roles`;
   let source = '';
   try {
    
    let response = await axios.post(PATH,role);
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
     artifact = {status : 'nok', error:{type: 'CLIENT', text:'Failed Fetch Attempt'}};
     return artifact;
   }
  }

export async function role_delete(role){
   const PATH = `/apiv1/roles/${role._id}`;
   let source = '';
   try {
    
    let response = await axios.delete(PATH);
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
   }
  }

export async function role_permissions_delete(roleId,permissionName){
 const PATH = `/apiv1/roles/:_id/permissions/:permission_name`;
 let source = '';
 try {
  
  let response = await axios.delete(PATH.replace(/:_id/,roleId).replace(/:permission_name/,permissionName));
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




/**
 * 
 * @param {String} roleId The Role _id.
 * @param {Array} permissions The permissions to add to the Role.
 */
export async function role_permissions_add(roleId,permissions){
   const PATH = `/apiv1/roles/:_id/permissions`;
   let source = '';
   try {
    
    let response = await axios.put(PATH.replace(/:_id/,roleId),permissions);
    let artifact = response.data;
    source = artifact.source;
    emit({type:'artifact',source:source, artifact:artifact});
    if(artifact.message) emit({type:'message',source:source, message: artifact.message});
    console.log(artifact);
    return artifact;
   } catch (error) {
    let artifact;
    console.log(error);
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

/**
 * 
 * @param {String} roleId The Role _id.
 * @param {Array} permissions The permissions to add to the Role.
 */
export async function user_generate(){
   const PATH = `/apiv1/generateuser`;
   let source = '';
   try {
    
    let response = await axios.get(PATH);
    let artifact = response.data;
    source = artifact.source;
    emit({type:'artifact',source:source, artifact:artifact});
    if(artifact.message) emit({type:'message',source:source, message: artifact.message});
    console.log(artifact);
    return artifact;
   } catch (error) {
    let artifact;
    console.log(error);
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

/**
 * 
 * @param {String} roleId The Role _id.
 * @param {Array} permissions The permissions to add to the Role.
 */
export async function user_browse(){
   const PATH = `/apiv1/users`;
   let source = '';
   try {
    
    let response = await axios.get(PATH);
    let artifact = response.data;
    source = artifact.source;
    emit({type:'artifact',source:source, artifact:artifact});
    if(artifact.message) emit({type:'message',source:source, message: artifact.message});
    console.log(artifact);
    return artifact;
   } catch (error) {
    let artifact;
    console.log(error);
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

/**
 * 
 * @param {String} roleId The Role _id.
 * @param {Array} permissions The permissions to add to the Role.
 */
export async function user_add(employeeId){
   const PATH = `/apiv1/employees/:empID/credential/generate`;
   let source = '';
   try {
    
    let response = await axios.post(PATH.replace(/:empID/,employeeId));
    let artifact = response.data;
    source = artifact.source;
    emit({type:'artifact',source:source, artifact:artifact});
    if(artifact.message) emit({type:'message',source:source, message: artifact.message});
    console.log(artifact);
    return artifact;
   } catch (error) {
    let artifact;
    console.log(error);
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



