import types from '../types';

export const product_Create_Pending = ()=> ({type: types.PRODUCT_CREATE_PENDING});
export const product_Create_Ok = (product)=> ({type: types.PRODUCT_CREATE_OK, payload: product});
export const product_Create_Nok = (error)=> ({type: types.PRODUCT_CREATE_NOK,payload: error});

export const product_Update_Pending = ()=> ({type: types.PRODUCT_UPDATE_PENDING});
export const product_Update_Ok = (product)=> ({type: types.PRODUCT_UPDATE_OK, payload: product});
export const product_Update_Nok = (error)=> ({type: types.PRODUCT_UPDATE_NOK,payload: error});

export const product_FetchAll_Pending = ()=> ({type: types.PRODUCT_FETCHALL_PENDING});
export const product_FetchAll_Ok = (products)=> ({type: types.PRODUCT_FETCHALL_OK, payload: products});
export const product_FetchAll_Nok = (error)=> ({type: types.PRODUCT_FETCHALL_NOK,payload: error});

