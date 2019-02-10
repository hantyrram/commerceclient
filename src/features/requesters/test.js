
function Response(){
 this.data = {data:null};
}

export const authenticate = async (user)=>{
 return Promise.resolve({username: 'Test'});
}

export const login = async (user)=>{
 let response = new Response();
 response.data.data = { user : {username : 'Test'}};
 return Promise.resolve(response);
}

export const logout = async (user)=>{
  return Promise.resolve({status: 'ok'});
 }
 

export const user_permissions_read = async ()=>{
 let response = new Response();
 response.data.data = {
   permissions: [
    {name:'permission_browse',label:'Permissions'},
    {name:'permission_add',label: 'Add New Permission'},
    {name:'permission_read',label: 'Permission'},
    {name:'user_browse', label: 'Users'},
    {name:'product_browse',label: 'Products'},
    {name:'order_browse',label: 'Orders'}
   ]
  }
  return Promise.resolve(response);
}

export const permission_browse = async()=>{
 let response = new Response();
 response.data.data = {
  permissions: [
   {name:'permission_browse',label:'Permissions'},
   {name:'permission_add',label: 'Add New Permission'},
   {name:'permission_read',label: 'Permission'},
   {name:'user_browse', label: 'Users'},
   {name:'product_browse',label: 'Products'},
   {name:'order_browse',label: 'Orders'}
  ]
 }
 return Promise.resolve(response)
}

export const permission_add = async(permission)=>{
 let response = new Response();
 permission._id = 'randompermissionid';
 response.data.data = {
  permission: permission
 }
 
 return Promise.resolve(response);
}