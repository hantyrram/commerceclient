const PermissionEntity = require('./PermissionEntity');
const UserEntity = require('./UserEntity');

const find = async function(filter){
 return await this.browse(filter);
}

PermissionEntity.find = find.bind(PermissionEntity);
UserEntity.find = find.bind(UserEntity);

export const Permission = PermissionEntity;
