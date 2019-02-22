

class Permission extends Entity{
 constructor(object){
  super(object);
 }
}


Permission.save = {permission_add} = require('../requesters');
Permission.update = {permission_edit} = require('../requesters');

export default Permission;