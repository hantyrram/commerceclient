import types from '../types';
export const productCategory_Delete_Pending = ()=> ({type: types.PRODUCTCATEGORY_DELETE_PENDING});
export const productCategory_Delete_Ok = (productCategory)=> ({type: types.PRODUCTCATEGORY_DELETE_OK, payload: productCategory});
export const productCategory_Delete_Nok = (error)=> ({type: types.PRODUCTCATEGORY_DELETE_NOK,payload: error});

