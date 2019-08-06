import Request from './Request';
import permission from 'uischemas/permission';

export class LoginRequest extends Request{

   constructor(credential){
      super();
      this.payload = credential;
   }

   get method(){
      return 'post';
   }
   get apiEndpoint(){
      return '/apiv1/login'
   }
}

export class EmployeeAddRequest extends Request{

   /**
    * 
    * @param {String} addMethod manual or auto. 'auto' Automatically generates employee id.
    */
   constructor(addMethod = 'auto'){
      super();
      this.addMethod = addMethod;
   }

   get method(){
      return 'post';
   }

   get apiEndpoint(){
      return `/apiv1/employees/add/${this.addMethod}`
   }

  
}

export class EmployeeBrowseRequest extends Request{

   get method(){
      return 'get';
   }

   get apiEndpoint(){
      return `/apiv1/employees`
   }
  
}

export class EmployeeRolesAddRequest extends Request{

   constructor(employeeId){
      super();
      this.employeeId = employeeId;
   }

   get method(){
      return 'post';
   }

   get apiEndpoint(){
      return `/apiv1/employees/${this.employeeId}/roles`
   }
  
}


export class CredentialCreateRequest extends Request{

   get method(){
      return 'post';
   }

   get apiEndpoint(){
      return `/apiv1/credentials/create`
   }

  
}

export class RoleBrowseRequest extends Request{

   constructor(query){
      super();
      this.query = query;
   }

   get method(){
      return 'get';
   }

   get apiEndpoint(){
      return `/apiv1/roles`
   }

  
}

export class RoleCreateRequest extends Request{
   get method(){
      return 'post';
   }
   get apiEndpoint(){
      return `/apiv1/roles`
   }
}

export class RoleDeleteRequest extends Request{
   constructor(roleId){
      super();
      this.roleId = roleId;
   }
   get method(){
      return 'delete';
   }
   get apiEndpoint(){
      return `/apiv1/roles/${this.roleId}`;
   }
}
export class RolePermissionsAddRequest extends Request{

   constructor(roleId){
      super();
      this.roleId = roleId;
   }

   get method(){
      return 'put';
   }

   get apiEndpoint(){
      return `/apiv1/roles/${this.roleId}/permissions`
   }
  
}
export class RolePermissionsDeleteRequest extends Request{
   constructor(roleId,permissionName){
      super();
      this.roleId = roleId;
      this.permissionName = permissionName;
   }
   get method(){
      return 'delete';
   }

   get apiEndpoint(){
      return `/apiv1/roles/${this.roleId}/permissions/${this.permissionName}`
   }
  
}

export class PermissionBrowseRequest extends Request{

   get method(){
      return 'get';
   }

   get apiEndpoint(){
      return `/apiv1/permissions`
   }

  
}



