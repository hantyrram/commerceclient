import types from '../types';
export const apis_Fetch_Pending = ()=> ({type: types.APIS_FETCH_PENDING});
export const apis_Fetch_Ok = (apis)=> ({type: types.APIS_FETCH_OK, payload: apis});
export const apis_Fetch_Nok = (error)=> ({type: types.APIS_FETCH_NOK,payload: error});

