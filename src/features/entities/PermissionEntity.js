

class PermissionEntity extends Entity{
 constructor(object){
  super(object);
 }
}


PermissionEntity.browse = {permission_browse} = require('../requesters');
PermissionEntity.save = {permission_add} = require('../requesters');
PermissionEntity.update = {permission_edit} = require('../requesters');

export default PermissionEntity;