import types from '../types';

export const attribute_Create_Pending = ()=> ({type: types.ATTRIBUTE_CREATE_PENDING});
export const attribute_Create_Ok = (attribute)=> ({type: types.ATTRIBUTE_CREATE_OK, payload: attribute});
export const attribute_Create_Nok = (error)=> ({type: types.ATTRIBUTE_CREATE_NOK,payload: error});

export const attribute_Update_Pending = ()=> ({type: types.ATTRIBUTE_UPDATE_PENDING});
export const attribute_Update_Ok = (attribute)=> ({type: types.ATTRIBUTE_UPDATE_OK, payload: attribute});
export const attribute_Update_Nok = (error)=> ({type: types.ATTRIBUTE_UPDATE_NOK,payload: error});

export const attribute_FetchAll_Pending = ()=> ({type: types.ATTRIBUTE_FETCHALL_PENDING});
export const attribute_FetchAll_Ok = (attributes)=> ({type: types.ATTRIBUTE_FETCHALL_OK, payload: attributes});
export const attribute_FetchAll_Nok = (error)=> ({type: types.ATTRIBUTE_FETCHALL_NOK,payload: error});

export const attribute_AddTerm_Pending = ()=> ({type: types.ATTRIBUTE_ADDTERM_PENDING});
export const attribute_AddTerm_Ok = (term)=> ({type: types.ATTRIBUTE_ADDTERM_OK, payload: term});
export const attribute_AddTerm_Nok = (error)=> ({type: types.ATTRIBUTE_ADDTERM_NOK,payload: error});

