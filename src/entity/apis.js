const API_VERSION = 'apiv1';

export default (action,params) =>{
 switch(action){
  case 'authenticate': return `/${API_VERSION}/authenticate`;
  case 'login': return `/${API_VERSION}/login`;
  case 'logout': return `/${API_VERSION}/logout`;
  //where params[0] = user._id
  case 'user_permissions_browse': return `/${API_VERSION}/users/${params[0]}/permissions`;
  case 'user_create': return `/${API_VERSION}/users/create`;
  //where params[0] = user._id
  case 'user_update': return `/${API_VERSION}/users/${params[0]}`;
  case 'user_delete': return `/${API_VERSION}/users/${params[0]}`;
  //where params[0] = user._id
  case 'user_roles_add' : return `/${API_VERSION}/users/${params[0]}/roles/add`;
  case 'role_browse' : return `/${API_VERSION}/roles`;//?query
  case 'role_create' : return `/${API_VERSION}/roles`;
  case 'role_update' : return `/${API_VERSION}/roles/${params[0]}`;
  case 'role_delete' : return `/${API_VERSION}/roles/${params[0]}`;
  case 'role_permissions_add' : return `/${API_VERSION}/roles/${params[0]}`;
  case 'permission_browse' : return `/${API_VERSION}/permissions`;
  case 'permission_create' : return `/${API_VERSION}/permissions`;
  case 'permission_update' : return `/${API_VERSION}/permissions/${params[0]}`;
  case 'permission_delete' : return `/${API_VERSION}/permissions/${params[0]}`;
  default : return null;
 }
}