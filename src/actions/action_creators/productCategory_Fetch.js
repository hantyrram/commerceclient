import types from '../types';
export const productCategory_Fetch_Pending = ()=> ({type: types.PRODUCTCATEGORY_FETCH_PENDING});
export const productCategory_Fetch_Ok = (productCategory)=> ({type: types.PRODUCTCATEGORY_FETCH_OK, payload: productCategory});
export const productCategory_Fetch_Nok = (error)=> ({type: types.PRODUCTCATEGORY_FETCH_NOK,payload: error});

