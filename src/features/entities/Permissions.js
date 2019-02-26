
import Entity from './Entity';
import {permission_browse as browse} from '../requesters';
import {permission_add as save} from '../requesters';
import {permission_edit as update} from '../requesters';
import {permission_delete as del} from '../requesters';

class Permission extends Entity{}
Permission.browse = browse;
Permission.save = save;
Permission.update = update;
Permission.delete = del;

export default Permission;