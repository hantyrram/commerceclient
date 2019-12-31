import types from '../types';
export const productCategory_Create_Pending = ()=> ({type: types.PRODUCTCATEGORY_CREATE_PENDING});
export const productCategory_Create_Ok = (productCategory)=> ({type: types.PRODUCTCATEGORY_CREATE_OK, payload: productCategory});
export const productCategory_Create_Nok = (error)=> ({type: types.PRODUCTCATEGORY_CREATE_NOK,payload: error});

export const productCategory_Delete_Pending = ()=> ({type: types.PRODUCTCATEGORY_DELETE_PENDING});
export const productCategory_Delete_Ok = (productCategory)=> ({type: types.PRODUCTCATEGORY_DELETE_OK, payload: productCategory});
export const productCategory_Delete_Nok = (error)=> ({type: types.PRODUCTCATEGORY_DELETE_NOK,payload: error});

export const productCategory_Fetch_Pending = ()=> ({type: types.PRODUCTCATEGORY_FETCH_PENDING});
export const productCategory_Fetch_Ok = (productCategory)=> ({type: types.PRODUCTCATEGORY_FETCH_OK, payload: productCategory});
export const productCategory_Fetch_Nok = (error)=> ({type: types.PRODUCTCATEGORY_FETCH_NOK,payload: error});

