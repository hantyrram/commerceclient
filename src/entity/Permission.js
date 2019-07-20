import axios from './axios';
import Entity from './Entity';

/**
 * @extends Entity
 */
class Permission extends Entity{

 get identifier(){
   return 'name';
 }  

 createActionName(){
  return 'permission_create';
 }
 updateActionName(){
  return 'permission_update';
 }
 deleteActionName(){
  return 'permission_delete';
 }
}

export default Permission;