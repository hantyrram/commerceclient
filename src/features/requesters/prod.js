import axios from '../../axios';

export const authenticate = async()=>{
  return await axios.get(`/apiv1/authenticate`);
}
export const login = async (user)=>{
 return await axios.post('/apiv1/login',user);
}

export const logout = async ()=>{
  return await axios.get('/apiv1/logout');
 }

 
export const user_permissions_read = async (username)=>{
  return await axios.get(`/apiv1/employees/credential/${username}/permissions`);
}

export const permission_browse = async ()=>{
 return await axios.get('/apiv1/permissions');
}

export const permission_create = async (permission)=>{
  return await axios.post('/apiv1/permissions',permission);
 }

export const permission_edit = async (permission)=>{
 return await axios.update('/apiv1/permissions'+permission.name,permission);
}

export const permission_delete = async (permission)=>{
 return await axios.delete('/apiv1/permissions/'+permission.name);
}

export const user_browse = async ()=>{
 return await axios.get('/apiv1/users');
}


 
 
