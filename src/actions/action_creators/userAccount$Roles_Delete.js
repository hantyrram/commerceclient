import types from '../types';
export const userAccount$Roles_Delete_Pending = ()=> ({type: types.USERACCOUNT$ROLES_DELETE_PENDING});
export const userAccount$Roles_Delete_Ok = (role)=> ({type: types.USERACCOUNT$ROLES_DELETE_OK, payload: role});
export const userAccount$Roles_Delete_Nok = (error)=> ({type: types.USERACCOUNT$ROLES_DELETE_NOK,payload: error});

