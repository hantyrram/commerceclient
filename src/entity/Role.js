import Entity from './Entity';

class Role extends Entity {
   createActionName(){
      return 'role_create';
   }
   updateActionName(){
      return 'role_update';
   }
   deleteActionName(){
      return 'role_delete';
   }
}
 
export default Role;