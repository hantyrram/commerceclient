import Request from './Request';

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
