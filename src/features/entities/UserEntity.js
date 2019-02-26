

class UserEntity extends Entity{
 constructor(object){
  super(object);
 }
}


UserEntity.browse = {user_browse} = require('../requesters');
UserEntity.save = {user_add} = require('../requesters');
UserEntity.update = {user_edit} = require('../requesters');

export default UserEntity;