
let permissions =  [
  {_id:1, name:'permission_browse',label:'Permissions',name2:'permission_browse',name3:'Permissions',name4:'permission_browse',name5:'Permissions',name6:'permission_browse',name7:'Permissions',name8:'permission_browse',name9:'Permissions',name10:'Permissions',name11:'Permissions',name13:'Permissions'},
  {_id:2,name:'permission_add',label: 'Add New Permission',name2:'permission_browse',name3:'Permissions',name4:'permission_browse',name5:'Permissions',name6:'permission_browse',name7:'Permissions',name8:'permission_browse',name9:'Permissions',name10:'Permissions',name11:'Permissions',name13:'Permissions'},
  {_id:3,name:'permission_read',label: 'Permission',name2:'permission_browse',name3:'Permissions',name4:'permission_browse',name5:'Permissions',name6:'permission_browse',name7:'Permissions',name8:'permission_browse',name9:'Permissions',name10:'Permissions',name11:'Permissions',name13:'Permissions'},
  {_id:4,name:'user_browse', label: 'Users',name2:'permission_browse',name3:'Permissions',name4:'permission_browse',name5:'Permissions',name6:'permission_browse',name7:'Permissions',name8:'permission_browse',name9:'Permissions',name10:'Permissions',name11:'Permissions',name13:'Permissions'},
  {_id:5,name:'product_browse',label: 'Products',name2:'permission_browse',name3:'Permissions',name4:'permission_browse',name5:'Permissions',name6:'permission_browse',name7:'Permissions',name8:'permission_browse',name9:'Permissions',name10:'Permissions',name11:'Permissions',name13:'Permissions'},
  {_id:6,name:'order_browse',label: 'Orders',name2:'permission_browse',name3:'Permissions',name4:'permission_browse',name5:'Permissions',name6:'permission_browse',name7:'Permissions',name8:'permission_browse',name9:'Permissions',name10:'Permissions',name11:'Permissions',name13:'Permissions'},
];

let userPermissions = [
  {name:'permission_browse',label:'Permissions'},
  {name:'permission_add',label: 'Add New Permission'},
  {name:'permission_read',label: 'Permission'},
  {name:'permission_edit',label: 'Edit Permission'},
  {name:'user_browse', label: 'Users'},
  {name:'product_browse',label: 'Products'},
  {name:'order_browse',label: 'Orders'}
 ]

function Response(){
 this.data = {data:null};
}

export const authenticate = async ()=>{
 let response = new Response();
 response.data.data = { user : {username : 'Test'}};
 return Promise.resolve(response);
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
   permissions: userPermissions
  }
  return Promise.resolve(response);
}

export const permission_browse = async()=>{
 let response = new Response();
 response.data.data = {
  permissions: permissions
 }
 return Promise.resolve(response)
}

export const permission_add = async(permission)=>{
 let response = new Response();
 let p = Object.assign({_id: permissions.length + 1}, permission);
 permissions.push(p);
 response.data.status = 'ok';
 response.data.message = {type: 'success', text: 'Permission Added Successfully'}
 response.data.data = {
  permission: p
 }
 return Promise.resolve(response);
}

export const permission_edit= async(permission)=>{
 let response = new Response();
 permission._id = 'randompermissionid';
 response.data.data = {
  permission: permission
 }
 
 return Promise.resolve(response);
}

export const permission_delete = async(permission)=>{
 console.log('permission passed to delete',permission);
  let permissionToDelete = permissions.find(p=>{
    return p._id === permission._id;
  });

  let response = new Response();
  if(permissionToDelete){
    permissions = permissions.filter(p=>{//updated permissions
     return p._id !== permissionToDelete._id;
    });
    response.data.status = 'ok';
    response.data.message = permission._id + ' deleted';
    return Promise.resolve(response);
  }
  response.data.status = 'nok';
  response.data.message = permission._id + ' does not exist';
  return Promise.resolve(response);
}