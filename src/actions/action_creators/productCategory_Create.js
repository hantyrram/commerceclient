import types from '../types';
export const productCategory_Create_Pending = ()=> ({type: types.PRODUCTCATEGORY_CREATE_PENDING});
export const productCategory_Create_Ok = (productCategory)=> ({type: types.PRODUCTCATEGORY_CREATE_OK, payload: productCategory});
export const productCategory_Create_Nok = (error)=> ({type: types.PRODUCTCATEGORY_CREATE_NOK,payload: error});

